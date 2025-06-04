import nodemailer from "nodemailer";
import { SmtpConfig } from "./config";

export const createClient = (smtpConfig: SmtpConfig) => nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  auth: {
    user: smtpConfig.auth.user,
    pass: smtpConfig.auth.pass
  }
});