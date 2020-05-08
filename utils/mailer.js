const nodemailer = require("nodemailer")
const nodemailMailGun = require("nodemailer-mailgun-transport")



const auth = {
  auth: {
    api_key: process.env.api_key,
    domain: process.env.domain,
  },
}

let transporter = nodemailer.createTransport(nodemailMailGun(auth))

const getResetPasswordURL = (user, token) => {
  return `http://localhost:3000/reset-password/${user._id}/${token}`
}

const forgotPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = "Reset your password"
  const html = `
  <div style="text-align: center; font-family: system-ui; color: rgb(6, 120, 155)">
      <h1>Reset Your Password</h1>
      <br>
  <img
   src="https://www.razlee.com/wp-content/uploads/2017/10/Password-Reset-1.png"
   style="display: block;
   margin-left: auto;
   margin-right: auto;
   width: 25%;"
   >
   <br>
   <div>
     <h3>Hi, <b>${user.username}</b>, we see that you've forgot your password. Don't worry, below is a one-time link generated to help you reset your password. This link will expire in 2 minutes </h3>
     <a href=${url}>${url}</a>
   </div>
  </div>
  `

  return { from, to, subject, html }
}

const confirmationEmailTemplate = (user) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = "Password Confirmation Email"
  const html = `
  <div>
    <img
      src="https://www.betterworldinternational.org/wp-content/uploads/2016/08/tick-mark.png"
      style=
      "display: block;
      margin-left: auto;
      margin-right: auto;
      width: 25%;"
    >
    <div style="text-align: center; font-family: system-ui; color: rgb(6, 120, 155)">
      <h2>${user.username}, your password has been successfully updated.</h2>
    </div>
  </div>
  `
  return { from, to, subject, html }
}


const randomGratitudeTemplate = (user, randomGratitudeObject) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = "Message from your friends"
  const html = `
  <img
    src="https://i.pinimg.com/originals/9f/8a/16/9f8a16e38df86be51951fa374fb9b351.png"
    style="display: block;
    margin-left: auto;
    margin-right: auto;
    width: 25%;"
  >
  <div style="text-align: center; color: rgb(6, 120, 155)">
    <h3>Hi, ${user.username}!</h3>
    <h3>Hope you are doing great.</h3>
    <br>
    <p style="color: rgb(6, 120, 155)">
      Thank you for consistently writing out. We see that you've written more than 10 gratitudes, so we wanted to send back a gratitude of yours, and remind you of your good habit. Keep writing more, and don't forget to be grateful!
    </p>
    <br>
    <hr style="width: 95%">
    <div style="color: rgb(21, 105, 153)">
      <h3>On ${randomGratitudeObject.date}, you were grateful for</h3>
      <p>${randomGratitudeObject.gratitudeTitle}</p>
      <p>${randomGratitudeObject.gratitudeDescription}</p>
    </div>
  </div>
    `
  return { from, to, subject, html }
}

module.exports = {
  transporter,
  getResetPasswordURL,
  forgotPasswordTemplate,
  confirmationEmailTemplate,
  randomGratitudeTemplate,
}
