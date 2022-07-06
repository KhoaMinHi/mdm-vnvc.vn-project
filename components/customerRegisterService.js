const customer = require('../models/customerModel');
const nodemailer = require("nodemailer");
const validate  = require('deep-email-validator');
const sha1 = require("crypto-js/sha1");
const redisClient = require("./redisService");

module.exports = async function registerCustomerService(hostRegister, customerRegisterData) {
  let result = {
    success: 1, 
    type: 'success', 
    message:'Chờ khoản 2 phút để gởi được mail và nhận mật khẩu khởi tạo! Nếu không có hãy gửi lại yêu cầu mới!', 
    invalidType : ['invalidEmail', 'existedEmail', 'unActiveEmail'],
    email: customerRegisterData.email,
    active: false
  };
  //const invalidType = ['invalidEmail', 'existedEmail', 'unActiveEmail'];
  //check invalid mail
  // const isValidEmail = await validate.validate(customerRegisterData.email);
  // if (!isValidEmail.valid) {
  //   result.success = 0;
  //   result.type = result.invalidType[0];
  //   result.message = "Mail của bạn không hợp lệ";
  //   return result;
  // }
  
  //check existed email in database
  const existedEmail = await customer.find({ email: customerRegisterData.email });
  if (!existedEmail || existedEmail == undefined) {
    if(existedEmail.active = true){
        result.success = 0;
        result.type = result.invalidType[1];
        result.message = "Tài khoản đã tồn tại! Vui lòng login.";
        result.active = true;
    }
    else{
        result.success = 0;
        result.type = result.invalidType[2];
        result.message = "Tài khoản chưa kích hoạt! Vui lòng kích hoạt.";
    }
  }

  //random code
  const codeRegister = Math.floor(100000 + Math.random() * 900000); //generate 6 digit password
  //reset attribute: add code, encode password
  customerRegisterData.code = codeRegister;
  customerRegisterData.password = sha1(customerRegisterData.password).toString(); //only hash, doesn't need encrypt
  //set region
  customerRegisterData.address.region = await getProvinceRegion(customerRegisterData.address.province);
  //let newCustomer = new customer(customerRegisterData);
  await (async () => {
    await customerRegisterData.save();
    sendMailCode(customerRegisterData, hostRegister); //send password to customer
  })();

  return result;
}

module.exports = async function getProvinceRegion(province){
  region = await redisClient.HGET("province:region", province);
  return region;
}

module.exports = function sendMailCode(customer, hostRegister) {
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
  const activeLink = `${hostRegister}/customer/activate?email=${customer.email}&code=${customer.code}&active=false`;

  const html = 
  `
  <div style="display: block; text-align: center;;">
  <div><h4>Sao chép mã và dán vào ô kích hoạt!</h4></div>
  <div><h2 style="font-weight: bold;">${customer.code}</h2></div>
  </div>
  `;
  
  transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL, // sender address
    to: customer.email, // list of receivers
    subject: "VNVC - KÍCH HOẠT TÀI KHOẢN!", // Subject line
    html, // html body
  });
}