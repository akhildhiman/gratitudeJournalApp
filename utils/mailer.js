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
  return `http://localhost:3000/update-password/${user._id}/${token}`
}

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = "PASSWORD UPDATE EMAIL"
  const text = "Reset your email"
  const html = `This is your password reset url:
  
  <a href=${url}>${url}</a>`

  return { from, to, subject, text, html }
}

const confirmationEmailTemplate = (user) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = "CONFIRMATION EMAIL"
  const text = "Your password has been successfully updated"

  return { from, to, subject, text }
}

const randomGratitudeTemplate = (user, randomGratitudeObject) => {
  const from = process.env.EMAIL
  const to = user.email
  const subject = `Good Morning, ${user.username}, we hope you are doing great`
  const html = `
          <h1="title">Hi, ${user.username}! Hope you are doing great.</h1>
          <h3="subtitle">Thank you for consistently writing out. We see that you've written more than 10 gratitudes, so we wanted to send you some of your gratitudes, and remind you of your good habit.</h3>
          <h3="subtitle">${randomGratitudeObject.gratitudeTitle}</h3>
          <h3="subtitle">${randomGratitudeObject.gratitudeDescription}</h3>
    `
  return { from, to, subject, html }
}

module.exports = {
  transporter,
  getResetPasswordURL,
  resetPasswordTemplate,
  confirmationEmailTemplate,
  randomGratitudeTemplate,
}
