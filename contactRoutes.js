import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "nagagopal@techpixe.com",
    pass: "nagagopal@techpixe.com",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // ── Notification to Diwakar Solar team ──────────────────────────────────
    await transporter.sendMail({
      from: '"Diwakar Solar Website" <nagagopal@techpixe.com>',
   to: "nagagopal@techpixe.com",
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1e3a8a;padding:24px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;">New Website Inquiry</h2>
            <p style="color:#93c5fd;margin:4px 0 0;">Diwakar Solar Contact Form</p>
          </div>
          <div style="background:#f8fafc;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:bold;width:120px;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:bold;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                  <a href="mailto:${email}" style="color:#2563eb;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#64748b;font-weight:bold;">Phone</td>
                <td style="padding:12px 0;">
                  <a href="tel:${phone}" style="color:#2563eb;">${phone}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
              <p style="margin:0;color:#1e40af;font-size:14px;">
                Reply directly to this email to respond to <strong>${name}</strong>.
              </p>
            </div>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">
            Diwakar Renewable &amp; Infra Pvt. Ltd. &copy; ${new Date().getFullYear()}
          </p>
        </div>
      `,
    });

    // ── Auto-reply to user ──────────────────────────────────────────────────
    await transporter.sendMail({
      from: '"Diwakar Solar" <nagagopal@techpixe.com>',
      to: email,
      subject: "We received your inquiry — Diwakar Solar",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1e3a8a;padding:24px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;">Thank you, ${name}!</h2>
            <p style="color:#93c5fd;margin:4px 0 0;">We've received your inquiry.</p>
          </div>
          <div style="background:#f8fafc;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
            <p style="color:#334155;line-height:1.7;">
              Thank you for reaching out to <strong>Diwakar Solar</strong>. Our team will review
              your message and get back to you within <strong>24–48 business hours</strong>.
            </p>
            <p style="color:#334155;line-height:1.7;">
              For faster support, call us at
              <a href="tel:+918562010054" style="color:#2563eb;font-weight:bold;">+91 85620 10054</a>
              or reach us on WhatsApp.
            </p>
            <div style="margin-top:24px;text-align:center;">
              <a href="https://wa.me/918562010054"
                style="background:#16a34a;color:white;padding:12px 32px;border-radius:8px;
                       text-decoration:none;font-weight:bold;display:inline-block;">
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">
            Diwakar Renewable &amp; Infra Pvt. Ltd. — Jaipur, Rajasthan
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: "Inquiry sent successfully!" });
  } catch (err) {
    console.error("Mail error:", err.message);
    res.status(500).json({ success: false, message: "Failed to send. Try again later." });
  }
});

export default router;