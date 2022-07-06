const nodemailer = require("nodemailer");

module.exports = function sendMailCode(email, code) {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL, // generated ethereal user
        pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    const html = 
    `
    <div style="display: block; text-align: center;;">
    <div><h4>Đây là mã code của quý khách. Cẩn thận không chia sẻ với bất kỳ ai!</h4></div>
    <div><h2 style="font-weight: bold;">${code}</h2></div>
    </div>
    `;
    
    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: email, // list of receivers
      subject: "VNVC - GỬI MÃ CODE!", // Subject line
      html, // html body
    });
}