import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.CONTACT_TO_EMAIL ?? user;
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  if (!host || !user || !pass || !from || !to) {
    return null;
  }

  return { host, port, user, pass, from, to, secure };
}

export function isMailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendContactEmail(payload: ContactPayload) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error(
      "SMTP is not configured. Add SMTP_* and CONTACT_TO_EMAIL to your environment.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const subject = `Portfolio message from ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject,
    text,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p style="margin-top: 16px; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
