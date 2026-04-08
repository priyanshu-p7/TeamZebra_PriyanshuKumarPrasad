const QRCode = require('qrcode');

const generateQR = async (userId, eventId) => {
  const timestamp = Date.now();
  const qrCodeData = `${userId}-${eventId}-${timestamp}`;

  try {
    const qrCodeImage = await QRCode.toDataURL(qrCodeData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    return { qrCodeData, qrCodeImage };
  } catch (error) {
    throw new Error('Error generating QR code');
  }
};

module.exports = generateQR;
