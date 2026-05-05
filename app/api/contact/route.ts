import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, lastName, email, phone, subject, message } = await req.json();

  if (!name || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from:    "Rivas Technologies <onboarding@resend.dev>",
    to:      ["contact@rivastechnologies.com"],
    replyTo: email,
    subject: subject || `New inquiry from ${name} ${lastName}`,
    text: `
Name:    ${name} ${lastName}
Email:   ${email}
Phone:   ${phone || "—"}
Subject: ${subject || "—"}

${message}
    `.trim(),
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
  <div style="background:#0A7CFF;padding:24px 32px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">New Inquiry — Rivas Technologies</h1>
  </div>
  <div style="background:#f8f9ff;padding:32px;border:1px solid #e2e6f4;border-top:none;border-radius:0 0 12px 12px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr><td style="padding:8px 0;color:#6868A0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${name} ${lastName}</td></tr>
      <tr><td style="padding:8px 0;color:#6868A0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#0A7CFF">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6868A0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Phone</td><td style="padding:8px 0">${phone ? `<a href="tel:${phone}" style="color:#0A7CFF">${phone}</a>` : "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#6868A0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Subject</td><td style="padding:8px 0">${subject || "—"}</td></tr>
    </table>
    <div style="background:#fff;border:1px solid #e2e6f4;border-radius:8px;padding:20px">
      <p style="margin:0 0 8px;color:#6868A0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Message</p>
      <p style="margin:0;line-height:1.7;white-space:pre-wrap">${message}</p>
    </div>
    <p style="margin:24px 0 0;color:#9898B0;font-size:12px">Sent from rivastechnologies.com contact form</p>
  </div>
</div>
    `,
  });

  if (error) {
    console.error("[Contact API]", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
