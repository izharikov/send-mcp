import { FastMCP } from "fastmcp";
import { z } from "zod";
import { createClient } from "@/lib/smtp";
import { SmtpConfig } from "@/lib/config";

export const addSmptTools: (server: FastMCP, config: SmtpConfig) => void = (server, config) => {
  if (!validateSmtpConfig(config)) {
    console.error("SMTP configuration is invalid. Please check your environment variables.");
    return false;
  }
  const client = createClient(config);
  server.addTool({
    name: "send_smtp_email",
    description: "Send an email using SMTP",
    parameters: z.object({
      to: z.string().email().describe("Email address to send the email to"),
      subject: z.string().describe("Subject of the email"),
      body: z.string().describe("HTML body of the email"),
    }),
    annotations: {
      title: "Send SMTP Email",
      openWorldHint: true,
    },
    execute: async ({ to, subject, body }) => {
      const res = await client.sendMail({
        from: config.from,
        to,
        subject,
        html: body,
      });
      return {
        content: [{ type: "text", text: res.accepted.length > 0 ? "Email sent successfully." : "Email sending failed." }]
      }
    }
  });
  return true;
}

const validateSmtpConfig = (config: SmtpConfig) => {
  return config.enabled && config.host && config.auth.user && config.auth.pass && config.from;
}