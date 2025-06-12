const smtpPort = process.env.SMTP_PORT;

export type SmtpConfig = ReturnType<typeof loadConfiguration>['smtp'];
export type Config = ReturnType<typeof loadConfiguration>;

export const loadConfiguration = () => ({
  smtp: {
    enabled: process.env.SMTP_ENABLED === "true",
    from: process.env.SMTP_FROM,
    host: process.env.SMTP_HOST ?? 'smtp.mailendo.com',
    port: smtpPort ? parseInt(smtpPort) : 25,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  },
  api: {
    url: process.env.API_URL ?? 'https://api.sitecoresend.io/v3',
    apiKey: process.env.API_KEY,
  },
  transactionalEmails: {
    campaignId: process.env.TRANSACTIONAL_EMAILS_CAMPAIGN_ID,
  }
});
