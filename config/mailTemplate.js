exports.generateMailBody = (userName, products) => {
  const productList = products.map((p, index) =>
    `${index + 1}. ${p.name} - ₹${p.price}`
  ).join('\n');

  return `
Hi ${userName},

Thank you for your interest. Here are the product details:

${productList}

Best regards,  
Your Company Team
`;
};
