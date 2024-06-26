import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { logger } from '@repo/logger';
import { Environment, MODE } from '@repo/utils';
import { env } from './config';

// Import the SignupEmailData interface from the appropriate module

const client = new SESClient({ region: env.AWS_REGION });

const url = MODE === Environment.Local ? new URL('https://adsviewer.io') : new URL(env.PUBLIC_URL);
const baseDomain = () => `${MODE === Environment.Production ? '' : `${MODE}.`}${url.hostname}`;

interface ActionEmailData {
  email: string;
  firstName: string;
  lastName: string;
  action_url: string;
}

export const sendForgetPasswordEmail = async (data: ActionEmailData) => {
  const command = await client
    .send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [data.email],
        },
        Source: `The AdsViewer Team <hello@${baseDomain()}>`,
        Message: {
          Subject: {
            Data: 'Action required to reset your password',
          },
          Body: {
            Html: {
              Data: `<p>${[
                `Hi ${data.firstName} ${data.lastName},`,
                'Someone has requested a link to change your password. You can do this through the button below.',
                `<a href="${data.action_url}">Change my password</a>`,
                '',
                "If you didn't request this, please ignore this email.",
                "Your password won't change until you access the link above and create a new one.",
              ].join('<br />')}</p>`,
            },
          },
        },
      }),
    )
    .catch((err: unknown) => {
      logger.error(err);
    });
  logger.info(JSON.stringify(command));
};

export const sendConfirmEmail = async (data: ActionEmailData) => {
  const command = await client
    .send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [data.email],
        },
        Source: `The AdsViewer Team <hello@${baseDomain()}>`,
        Message: {
          Subject: {
            Data: 'Please confirm your email',
          },
          Body: {
            Html: {
              Data: `<p>${[
                `Hi ${data.firstName} ${data.lastName},`,
                'Thank you for registering in adsviewer.io. Please click the link below to confirm your email and access your account.',
                `<a href="${data.action_url}">Confirm my email</a>`,
                '',
                "If you didn't request this, please ignore this email.",
                "You won't be able to access adsviewer.io dashboard until you confirm your email through the link above.",
              ].join('<br />')}</p>`,
            },
          },
        },
      }),
    )
    .catch((err: unknown) => {
      logger.error(err);
    });
  logger.info(JSON.stringify(command));
};

interface SignupEmailData {
  firstName: string;
  email: string;
}

export const sendSignupEmail = async (data: SignupEmailData) => {
  const command = await client
    .send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [data.email],
        },
        Source: `The AdsViewer Team <hello@${baseDomain()}>`,
        Message: {
          Subject: {
            Data: 'Welcome to AdsViewer',
          },
          Body: {
            Html: {
              Data: createSignupEmailBody(data),
            },
          },
        },
      }),
    )
    .catch((err: unknown) => {
      logger.error(err);
    });
  logger.info(JSON.stringify(command));
};

const createSignupEmailBody = (data: SignupEmailData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Welcome to AdsViewer</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { width: 80%; margin: auto; padding: 20px; }
            .header { background-color: #0060F1; color: white; padding: 10px; text-align: center; }
            .content { margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; }
            .button {
                background-color: #0060F1; /* Blue */
                border: none;
                color: white !important; /* Ensures text is white */
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px; /* Optional: for rounded corners */
            }
            .button:hover, .button:active, .button:focus {
                text-decoration: none !important;
                color: white !important;
            }
            a { 
                text-decoration: underline !important; /* Ensures that links are underlined */
            }
            .icon-text {
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to AdsViewer</h1>
            </div>
            <div class="content">
                <p>Hi ${data.firstName},</p>

                <p>We're thrilled to have you join us at AdsViewer – your new partner in revolutionizing how you manage your advertisment.</p>

                <p>You can get started with three easy steps:</p>
                <ol>
                </ol>

                <p>We're eager to support you every step of the way. Should you have any questions or feedback, reach out anytime at <a href="mailto:support@${baseDomain()}">support@${baseDomain()}</a>, or Book A Call by using the button below.</p>
                
                <p><a href="https://adsviewer.io/contact" class="button">Book A Call</a></p>

                <p>Once again, welcome to the AdsViewer family. Here's to less time managing inventory and more time growing your business! We look forward to onboarding you to AdsViewer.</p>

                <div class="footer">
                    <p>Cheers,<br>
                    The AdsViewer Team<br>
                    <span class="icon-text">✉️</span><a href="mailto:hello@${baseDomain()}">hello@${baseDomain()}</a></p>
                </div>
            </div>
        </div>
    </body>
    </html>`;
};
