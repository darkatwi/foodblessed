const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVolunteerWelcome({ first, email }) {
  const waLink = process.env.WHATSAPP_LINK || "https://wa.me/96170159337";

  await resend.emails.send({
    from: "FoodBlessed <contact@foodblessed.org>",
    to: email,
    subject: "Welcome to FoodBlessed — You're a Hunger Hero! 🌿",
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fdfaf2;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(43,47,36,.10);">
        <div style="background:linear-gradient(135deg,#33611d,#4e8b2c);padding:40px 40px 32px;text-align:center;">
          <img src="https://foodblessed.org/wp-content/uploads/2020/01/foodblessed-logo-white.png" alt="FoodBlessed" style="height:52px;margin-bottom:16px;" />
          <h1 style="color:#fff;font-size:26px;margin:0;font-weight:700;line-height:1.2;">Welcome, ${first}! 🎉</h1>
          <p style="color:rgba(255,255,255,.88);margin:10px 0 0;font-size:16px;">You're officially a <strong>Hunger Hero</strong>.</p>
        </div>
        <div style="padding:36px 40px;">
          <p style="font-size:16px;color:#2b2f24;line-height:1.7;margin:0 0 20px;">
            Thank you for signing up to volunteer with FoodBlessed. Our team will be in touch shortly to get you started.
          </p>
          <p style="font-size:16px;color:#2b2f24;line-height:1.7;margin:0 0 28px;">
            In the meantime, join our <strong>WhatsApp community</strong> to connect with fellow Hunger Heroes, get updates on upcoming volunteering sessions, and stay in the loop:
          </p>
          <div style="text-align:center;margin-bottom:32px;">
            <a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;font-weight:700;font-size:16px;padding:16px 36px;border-radius:999px;text-decoration:none;">
              Join our WhatsApp Community →
            </a>
          </div>
          <hr style="border:none;border-top:1px solid #e6dfcc;margin:0 0 24px;" />
          <p style="font-size:14px;color:#6f7361;line-height:1.65;margin:0;">
            Questions? Call or WhatsApp us at <a href="tel:+96170159337" style="color:#4e8b2c;">+961 70 159 337</a><br />
            Confidence Center, Ground Floor, Sin El Fil, Beirut, Lebanon.
          </p>
        </div>
      </div>
    `,
  });
}

async function sendContactReply({ toName, toEmail, originalMessage, replyText }) {
  await resend.emails.send({
    from: "FoodBlessed <contact@foodblessed.org>",
    to: toEmail,
    subject: "Re: Your message to FoodBlessed",
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fdfaf2;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(43,47,36,.10);">
        <div style="background:linear-gradient(135deg,#33611d,#4e8b2c);padding:32px 40px;text-align:center;">
          <img src="https://foodblessed.org/wp-content/uploads/2020/01/foodblessed-logo-white.png" alt="FoodBlessed" style="height:44px;" />
        </div>
        <div style="padding:36px 40px;">
          <p style="font-size:16px;color:#2b2f24;line-height:1.7;margin:0 0 8px;">Hi ${toName},</p>
          <div style="font-size:16px;color:#2b2f24;line-height:1.75;margin:0 0 28px;white-space:pre-line;">${replyText}</div>
          <hr style="border:none;border-top:1px solid #e6dfcc;margin:0 0 20px;" />
          <p style="font-size:13px;color:#9ca38f;margin:0 0 6px;">Your original message:</p>
          <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #e6dfcc;color:#6f7361;font-size:14px;line-height:1.65;font-style:italic;">${originalMessage}</blockquote>
          <hr style="border:none;border-top:1px solid #e6dfcc;margin:20px 0 20px;" />
          <p style="font-size:13px;color:#6f7361;line-height:1.65;margin:0;">
            FoodBlessed · <a href="tel:+96170159337" style="color:#4e8b2c;">+961 70 159 337</a><br />
            Confidence Center, Ground Floor, Sin El Fil, Beirut, Lebanon.
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = { sendVolunteerWelcome, sendContactReply };