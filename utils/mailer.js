const nodemailer = require("nodemailer")
const nodemailMailGun = require("nodemailer-mailgun-transport")

const auth = {
  auth: {
    api_key: process.env.api_key,
    domain: process.env.domain	
  }
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
  const html = `This is your password reset url <a href=${url}>${url}</a>`

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
    const subject = `HI, ${user.username}, WE'RE GOING TO SEND YOU A GRATITUDE THAT YOU HAVE LISTED A WHILE BACK`
    const text = `You were ${randomGratitudeObject.gratitudeTitle} on ${randomGratitudeObject.date}`
  
    return { from, to, subject, text }
}

module.exports = {
    transporter,
    getResetPasswordURL,
    resetPasswordTemplate,
    confirmationEmailTemplate,
    randomGratitudeTemplate
 }
