const { sendMail } = require('../services/mailService');
const { generateMailBody } = require('../config/mailTemplate');

exports.sendProductDetails = async (req, res) => {
    console.log("send product details called");
  const { userEmail, userName, products } = req.body;

  if (!userEmail || !userName || !Array.isArray(products)) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const emailContent = generateMailBody(userName, products);

  try {
    await sendMail(userEmail, 'Your Product Details', emailContent);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Email sending failed.' });
  }
};
