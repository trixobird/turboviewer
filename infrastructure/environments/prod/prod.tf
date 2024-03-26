locals {
  organization = "adsviewer"
  domain       = "adsviewer.happyharbor.io"
}

data "aws_caller_identity" "current" {}

terraform {
  cloud {
    organization = "adsviewer"
    workspaces {
      name = "prod"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.42.0"
    }
  }

  required_version = ">= 1.6.6"
}

data "tfe_outputs" "management_outputs" {
  organization = local.organization
  workspace    = "management"
}

provider "aws" {
  assume_role {
    role_arn = data.tfe_outputs.management_outputs.values.prod_assume_role_arn
  }
  region = var.aws_region
  default_tags {
    tags = var.default_tags
  }
}

module "workspace" {
  source = "../../modules/workspace"

  base_tags    = var.default_tags
  environment  = var.environment
  organization = local.organization
}

module "environment" {
  source = "../../modules/environment"

  amplify_token      = var.amplify_token
  domain             = local.domain
  environment        = var.environment
  github_role_name   = module.workspace.github_role_name
  organization       = local.organization
  service_subnet_ids = module.workspace.private_subnet_ids
  vpc_id             = module.workspace.vpc_id
  slack_webhook_url  = var.slack_webhook_url
  vercel_api_token   = var.vercel_api_token
  vercel_team        = var.vercel_team
}