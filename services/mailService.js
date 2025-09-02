const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashutoshshukla8874@gmail.com',
    pass: 'tmmb copm kdhv rbpw'  // Use environment variable or App Password
  }
});

exports.sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'ashutoshshukla8874@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};
