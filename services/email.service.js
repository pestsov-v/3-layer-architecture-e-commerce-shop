const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys");

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: { api_key: keys.SENDGRID_API_KEY },
  })
);

async function regEmail(body) {
  return await transporter.sendMail(regEmail(body.email));
}

module.exports = {
  transporter,
  regEmail,
};
