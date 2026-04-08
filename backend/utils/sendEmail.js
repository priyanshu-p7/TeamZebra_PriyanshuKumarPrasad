const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html, attachments }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Eventra" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error.message);
    // Don't throw - email failure shouldn't break booking
  }
};

const buildTicketEmail = ({ eventTitle, eventDate, eventLocation, eventDescription, mapLink, ticketCount, qrCodeCid, posterUrl, userName }) => {
  const posterSection = posterUrl
    ? `<div style="text-align:center;margin-bottom:20px;">
        <img src="${posterUrl}" alt="Event Poster" style="max-width:100%;border-radius:12px;" />
      </div>`
    : '';

  return `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#e0e0e0;border-radius:16px;overflow:hidden;border:1px solid #1e1e1e;">
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:30px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:28px;">🎫 Eventra</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Your ticket is confirmed!</p>
      </div>
      <div style="padding:30px;">
        <h3 style="color:#fff;margin:0 0 15px;">Hi ${userName},</h3>
        ${posterSection}
        <h2 style="color:#a78bfa;margin:0 0 10px;">${eventTitle}</h2>
        ${eventDescription ? `<p style="color:#a0a0a0;font-size:13px;line-height:1.5;margin:0 0 20px;">${eventDescription.length > 200 ? eventDescription.substring(0,200) + '...' : eventDescription}</p>` : ''}
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#888;font-size:13px;">📅 Date</td>
            <td style="padding:10px 0;color:#e0e0e0;text-align:right;">${new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#888;font-size:13px;">📍 Location</td>
            <td style="padding:10px 0;color:#e0e0e0;text-align:right;">
              ${eventLocation}
              ${mapLink ? `<br/><a href="${mapLink}" style="color:#8b5cf6;font-size:12px;text-decoration:none;">View on Google Maps ↗</a>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#888;font-size:13px;">🎟️ Tickets</td>
            <td style="padding:10px 0;color:#e0e0e0;text-align:right;">${ticketCount}</td>
          </tr>
        </table>
        <div style="text-align:center;margin:30px 0;padding:20px;background:#1a1a2e;border-radius:12px;border:1px solid #2a2a3e;">
          <p style="color:#a78bfa;margin:0 0 15px;font-size:14px;font-weight:600;">YOUR ENTRY PASS</p>
          <img src="${qrCodeCid}" alt="QR Ticket" style="width:200px;height:200px;" />
          <p style="color:#666;margin:15px 0 0;font-size:12px;">Show this QR code at the venue entrance</p>
        </div>
      </div>
      <div style="padding:20px;text-align:center;background:#0a0a0a;border-top:1px solid #1e1e1e;">
        <p style="margin:0;color:#555;font-size:12px;">© Eventra — Discover. Book. Experience.</p>
      </div>
    </div>
  `;
};

module.exports = { sendEmail, buildTicketEmail };
