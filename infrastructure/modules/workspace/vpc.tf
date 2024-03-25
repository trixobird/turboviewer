locals {
  endpoint_regions     = [data.aws_region.current.name]
  availability_zones   = ["${data.aws_region.current.name}a", "${data.aws_region.current.name}b", "${data.aws_region.current.name}c"]
  cidr_block           = "10.1.0.0/16"
  public_cidr_blocks   = ["10.1.0.0/20", "10.1.16.0/20", "10.1.32.0/20"]
  private_cidr_blocks  = ["10.1.128.0/20", "10.1.144.0/20", "10.1.160.0/20"]
  database_cidr_blocks = ["10.1.176.0/20", "10.1.192.0/20", "10.1.208.0/20"]
}

resource "aws_vpc" "vpc" {
  cidr_block                       = local.cidr_block
  enable_dns_hostnames             = true
  enable_dns_support               = true
  assign_generated_ipv6_cidr_block = true
  tags                             = { Name = "${var.environment}-${var.organization}" }
}

resource "aws_default_security_group" "default" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_egress_only_internet_gateway" "gateway" {
  vpc_id = aws_vpc.vpc.id
}

# Public Subnets (These can connect to the internet and the internet can connect to them.)

resource "aws_route_table" "public_routes" {
  vpc_id = aws_vpc.vpc.id
  tags   = { Name = "${var.environment}-public-routes" }
}

resource "aws_route" "public_routes_internet_gateway_ipv4" {
  route_table_id         = aws_route_table.public_routes.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gateway.id
}

resource "aws_route" "public_routes_internet_gateway_ipv6" {
  route_table_id              = aws_route_table.public_routes.id
  destination_ipv6_cidr_block = "::/0"
  gateway_id                  = aws_internet_gateway.gateway.id
}

resource "aws_subnet" "public" {
  count                   = length(local.public_cidr_blocks)
  availability_zone       = element(local.availability_zones, count.index)
  cidr_block              = element(local.public_cidr_blocks, count.index)
  ipv6_cidr_block         = cidrsubnet(aws_vpc.vpc.ipv6_cidr_block, 8, count.index + 1)
  map_public_ip_on_launch = true
  tags                    = { Name = "${var.environment}-public${count.index}-${element(local.availability_zones, count.index)}" }
  vpc_id                  = aws_vpc.vpc.id
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public_routes.id
}

# Private Subnets (These can connect to the internet, but the internet cannot directly connect to them.)

resource "aws_route_table" "private_routes" {
  count  = length(local.private_cidr_blocks)
  vpc_id = aws_vpc.vpc.id
  tags   = { Name = "${var.environment}-private-${element(local.availability_zones, count.index)}" }
}

resource "aws_route" "private_ipv6_egress" {
  count                       = length(aws_route_table.private_routes)
  destination_ipv6_cidr_block = "::/0"
  egress_only_gateway_id      = aws_egress_only_internet_gateway.gateway.id
  route_table_id              = element(aws_route_table.private_routes.*.id, count.index)
}

resource "aws_subnet" "private" {
  count                   = length(local.private_cidr_blocks)
  availability_zone       = element(local.availability_zones, count.index)
  cidr_block              = element(local.private_cidr_blocks, count.index)
  map_public_ip_on_launch = false
  tags                    = { Name = "${var.environment}-private-${element(local.availability_zones, count.index)}" }
  vpc_id                  = aws_vpc.vpc.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  route_table_id = aws_route_table.private_routes[count.index].id
  subnet_id      = element(aws_subnet.private.*.id, count.index)
}

# Database subnets (These are not connected to the internet)

resource "aws_route_table" "database_routes" {
  vpc_id = aws_vpc.vpc.id
  tags   = { Name = "${var.environment}-database" }
}

resource "aws_subnet" "database" {
  count                   = length(local.database_cidr_blocks)
  availability_zone       = element(local.availability_zones, count.index)
  cidr_block              = element(local.database_cidr_blocks, count.index)
  map_public_ip_on_launch = false
  tags                    = { Name = "${var.environment}-database-${element(local.availability_zones, count.index)}" }
  vpc_id                  = aws_vpc.vpc.id
}

resource "aws_route_table_association" "database" {
  count          = length(aws_subnet.database)
  route_table_id = aws_route_table.database_routes.id
  subnet_id      = element(aws_subnet.database.*.id, count.index)
}

# Aws Vpc Endpoints

locals {
  route_table_ids = concat(
    [aws_route_table.public_routes.id, aws_route_table.database_routes.id],
    aws_route_table.private_routes.*.id,
  )
}

resource "aws_security_group" "endpoint_interface" {
  name        = "${var.environment}-endpoint-interface"
  description = "ingress and egress for http(s) to the vpc for interface endpoints"
  vpc_id      = aws_vpc.vpc.id
  tags        = { Name = "${var.environment}-endpoint-interface" }
}

resource "aws_security_group_rule" "interface_ingress_all" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = [aws_vpc.vpc.cidr_block]
  ipv6_cidr_blocks  = [aws_vpc.vpc.ipv6_cidr_block]
  security_group_id = aws_security_group.endpoint_interface.id
}

resource "aws_security_group_rule" "interface_egress_all" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.endpoint_interface.id
}

resource "aws_security_group_rule" "interface_http_tcp" {
  for_each          = toset(["ingress", "egress"])
  type              = each.key
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = [aws_vpc.vpc.cidr_block]
  ipv6_cidr_blocks  = [aws_vpc.vpc.ipv6_cidr_block]
  security_group_id = aws_security_group.endpoint_interface.id
}

resource "aws_security_group_rule" "interface_http_quic" {
  for_each          = toset(["ingress", "egress"])
  type              = each.key
  from_port         = 80
  to_port           = 80
  protocol          = "udp"
  cidr_blocks       = [aws_vpc.vpc.cidr_block]
  ipv6_cidr_blocks  = [aws_vpc.vpc.ipv6_cidr_block]
  security_group_id = aws_security_group.endpoint_interface.id
}

resource "aws_security_group_rule" "interface_https_tcp" {
  for_each          = toset(["ingress", "egress"])
  type              = each.key
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = [aws_vpc.vpc.cidr_block]
  ipv6_cidr_blocks  = [aws_vpc.vpc.ipv6_cidr_block]
  security_group_id = aws_security_group.endpoint_interface.id
}

resource "aws_security_group_rule" "interface_https_quic" {
  for_each          = toset(["ingress", "egress"])
  type              = each.key
  from_port         = 443
  to_port           = 443
  protocol          = "udp"
  cidr_blocks       = [aws_vpc.vpc.cidr_block]
  ipv6_cidr_blocks  = [aws_vpc.vpc.ipv6_cidr_block]
  security_group_id = aws_security_group.endpoint_interface.id
}
