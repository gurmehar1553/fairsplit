const nodemailer = require("nodemailer");

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
// create reusable transpor.ter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure:false,
    auth: { 
      user: "4a1df356d12cb5",
      pass: "00aa67e548b8b0"
    }
  });

transporter.verify((e,s)=>{
    e? console.error(e):console.log("Teyar",s)
})

module.exports = transporter