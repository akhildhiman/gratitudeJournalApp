// const nodemailer = require("nodemailer")

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         clientId: process.env.clientId,
//         clientSecret: process.env.clientSecret,
//         refreshToken: process.env.refreshToken,
//         accessToken: process.env.accessToken,
//         expiresIn: process.env.expiresIn
//     }
// })

// getPasswordResetURL = (user, token) => {
//     return `http://localhost:3000/reset-password/${user._id}/${token}`
// }

// const resetPasswordTemplate = (user, url) => {  
//     from = process.env.EMAIL,
//     to = user.email,
//     subject = "Password Reset",
//     auth = {
//         user: user.email,
//         refreshToken: process.env.refreshToken,
//         accessToken: process.env.accessToken,
//         expiresIn: process.env.expiresIn
//     },
//     html = `
//         <p>We heard that you forgot your password. Sorry about that!</p>
//         <p>But don’t worry! You can use the following link to reset your password:</p>
//         <a href=${url}>${url}</a>
//         <p>If you don’t use this link within 1 hour, it will expire.</p>
//     `
//     return {from, to, subject, html, auth}
// }

// module.exports = { transporter, getPasswordResetURL, resetPasswordTemplate }


// // import nodemailer from "nodemailer"

// // export const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASSWORD
// //   }
// // })

// // export const getPasswordResetURL = (user, token) =>
// //   `http://localhost:3000/password/reset/${user._id}/${token}`

// // export const resetPasswordTemplate = (user, url) => {
// //   const from = process.env.EMAIL_LOGIN
// //   const to = user.email
// //   const subject = "🌻 Backwoods Password Reset 🌻"
// //   const html = `
// //   <p>Hey ${user.displayName || user.email},</p>
// //   <p>But don’t worry! You can use the following link to reset your password:</p>
// //   <a href=${url}>${url}</a>
// //   <p>If you don’t use this link within 1 hour, it will expire.</p>
// //   <p>Do something outside today! </p>
// //   <p>–Your friends at Backwoods</p>
// //   `

// //   return { from, to, subject, html }
// // }

