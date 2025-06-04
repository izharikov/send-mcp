const smtpPort = process.env.SMTP_PORT;

export type SmtpConfig = typeof config.smtp;

export const config = {
  smtp: {
    from: process.env.SMTP_FROM,
    host: process.env.SMTP_HOST,
    port: smtpPort ? parseInt(smtpPort) : 25,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  },
  api: {
    url: process.env.API_URL,
    key: process.env.API_KEY,
  },
};
