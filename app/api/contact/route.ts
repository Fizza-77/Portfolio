import { NextResponse } from "next/server";
import { isMailConfigured, sendContactEmail } from "@/lib/mailer";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!isMailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Add your SMTP keys to the environment.",
      },
      { status: 503 },
    );
  }

  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Please write a short message (at least 10 characters)." },
      { status: 400 },
    );
  }

  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 500 },
    );
  }
}
