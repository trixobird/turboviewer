variable "amplify_token" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "default_tags" {
  default = {

    Environment = "Production"
    ManagedBy   = "Terraform"
    Project     = "AdsViewer"

  }
  type = map(string)
}

variable "environment" {
  type    = string
  default = "prod"
}

variable "slack_webhook_url" {
  type = string
}

variable "vercel_api_token" {
  type = string
}
variable "vercel_team" {
  type = string
}