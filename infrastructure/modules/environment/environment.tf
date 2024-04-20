data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "~> 5.42.0"
      configuration_aliases = [aws.us_east_1]
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.4.0"
    }
  }
}

module "ses" {
  source      = "../../modules/ses"
  domain      = aws_route53_zone.zone.name
  environment = var.environment
  zone_id     = aws_route53_zone.zone.zone_id
}

data "aws_iam_policy_document" "sns_policy_document" {
  statement {
    actions = ["sns:Subscribe", "sns:Unsubscribe"]
    resources = [
      aws_sns_topic.channel_data_refresh_topic.arn,
    ]
  }
}

resource "aws_iam_policy" "sns_policy" {
  name   = "${var.environment}-sns-policy"
  policy = data.aws_iam_policy_document.sns_policy_document.json
}

locals {
  server_domain_prefix = "api"
  server_api_endpoint  = "https://${local.server_domain_prefix}.${local.domain}/${local.api_path}"
}
module "server" {
  source          = "../service"
  certificate_arn = aws_acm_certificate.wildcard.arn
  domain_name     = aws_route53_zone.zone.name
  domain_prefix   = local.server_domain_prefix
  domain_zone_id  = aws_route53_zone.zone.id
  environment     = var.environment
  environment_variables = {
    API_ENDPOINT = local.server_api_endpoint
    PORT         = 4000,
    PUBLIC_URL   = local.full_domain
  }
  github_role_name   = var.github_role_name
  mapped_secrets     = local.server_secrets
  service_name       = "server"
  service_subnet_ids = var.service_subnet_ids
  instance_role_policies = {
    "ses" = module.ses.send_email_policy_arn
    "sns" = aws_iam_policy.sns_policy.arn
  }
  vpc_id = var.vpc_id
}
