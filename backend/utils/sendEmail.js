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
      from: `"Eventify" <${process.env.EMAIL}>`,
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

const buildTicketEmail = ({ eventTitle, eventDate, eventTime, eventLocation, eventDescription, mapLink, ticketCount, qrCodeCid, posterUrl, userName, bookingId }) => {
  const posterStyle = posterUrl
    ? `background-image: url('${posterUrl}'); background-size: cover; background-position: center; height: 180px; border-radius: 20px 20px 0 0; position: relative;`
    : `background: #4F47E5; height: 140px; border-radius: 20px 20px 0 0; position: relative;`;

  const dateObject = new Date(eventDate);
  const formattedDate = dateObject.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px; min-height: 100vh;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        
        <!-- Header / Poster Area -->
        <tr>
          <td style="${posterStyle}">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)); border-radius: 20px 20px 0 0;"></div>
            <div style="position: absolute; bottom: 20px; left: 30px; color: white;">
              <p style="margin: 0; font-size: 11px; font-weight: bold; letter-spacing: 2px; color: rgba(255,255,255,0.7); text-transform: uppercase;">Eventify Pass</p>
              <h1 style="margin: 5px 0 0 0; font-size: 26px; font-weight: 900; line-height: 1.2;">${eventTitle}</h1>
            </div>
          </td>
        </tr>

        <!-- Ticket Info Body -->
        <tr>
          <td style="padding: 30px;">
            <p style="margin: 0 0 20px 0; color: #64748b; font-size: 15px;">Hi <strong style="color: #0f172a;">${userName}</strong>, your digital ticket is ready!</p>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 25px;">
              <tr>
                <td width="33%" style="padding-right: 10px;">
                  <p style="margin: 0 0 5px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Date</p>
                  <p style="margin: 0; font-size: 14px; color: #0f172a; font-weight: 700;">${formattedDate}</p>
                </td>
                <td width="33%" style="padding-right: 10px; border-left: 1px solid #e2e8f0; padding-left: 15px;">
                  <p style="margin: 0 0 5px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Time</p>
                  <p style="margin: 0; font-size: 14px; color: #0f172a; font-weight: 700;">${eventTime || 'TBA'}</p>
                </td>
                <td width="34%" style="border-left: 1px solid #e2e8f0; padding-left: 15px;">
                  <p style="margin: 0 0 5px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Tckts</p>
                  <p style="margin: 0; font-size: 14px; color: #0f172a; font-weight: 700;">x${ticketCount}</p>
                </td>
              </tr>
            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
              <tr>
                <td width="65%" style="padding-right: 20px;">
                  <p style="margin: 0 0 5px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Location</p>
                  <p style="margin: 0; font-size: 13px; color: #0f172a; font-weight: 700; line-height: 1.4;">${eventLocation}</p>
                  ${mapLink ? `<a href="${mapLink}" style="display: inline-block; margin-top: 8px; font-size: 12px; color: #4F47E5; text-decoration: none; font-weight: bold;">↗ Open in Map</a>` : ''}
                </td>
                <td width="35%">
                  <p style="margin: 0 0 5px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Invoice ID</p>
                  <p style="margin: 0; font-size: 13px; color: #0f172a; font-weight: 900; letter-spacing: 1px;">#${bookingId ? bookingId.toString().slice(-6).toUpperCase() : 'ENVT'}</p>
                </td>
              </tr>
            </table>

            <!-- The QR Scanner Block -->
            <div style="background-color: #f8fafc; border-radius: 16px; padding: 30px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 15px 0; font-size: 12px; font-weight: 800; letter-spacing: 2px; color: #4F47E5; text-transform: uppercase;">Entry Pass</p>
              <div style="display: inline-block; padding: 10px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 15px;">
                <img src="${qrCodeCid}" alt="QR Ticket" style="width: 180px; height: 180px; display: block;" />
              </div>
              <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: 500;">Please show this QR code at the venue limits.</p>
            </div>

          </td>
        </tr>

        <!-- Branding Footer -->
        <tr>
          <td style="background-color: #0f172a; padding: 25px; text-align: center; border-radius: 0 0 20px 20px;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; font-weight: 600;">Powered by Eventify</p>
            <p style="margin: 8px 0 0 0; color: #475569; font-size: 11px;">Discover. Book. Experience.</p>
          </td>
        </tr>

      </table>
    </div>
  `;
};

module.exports = { sendEmail, buildTicketEmail };
