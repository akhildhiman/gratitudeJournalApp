const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cron = require("node-cron")
const moment = require("moment")

const {
  transporter,
  getResetPasswordURL,
  forgotPasswordTemplate,
  confirmationEmailTemplate,
  randomGratitudeTemplate,
} = require("../utils/mailer")

const receiveConfirmationEmail = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
    const emailTemplate = confirmationEmailTemplate(user)
    transporter.sendMail(emailTemplate, (err) => {
      if (err) {
        res.status(500).json({ Error: err })
      }
    })
    res.status(200).json({ info: info.response })
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
}

module.exports = {
  createOneTimeTokenAndSendMail: async (req, res) => {
    const { email } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: "No user with that email" })
      }
      const hashedPassword = user.password
      const createdAt = user.createdAt
      const userId = user._id
      const secret = hashedPassword + "-" + createdAt //creating a secret this way makes it unique
      const token = jwt.sign({ userId }, secret, {
        expiresIn: 60,
      })
      const url = getResetPasswordURL(user, token) //one-time url with the userId and token embedded to it
      const emailTemplate = forgotPasswordTemplate(user, url)
      transporter.sendMail(emailTemplate, (err, info) => {
        //sending a mail template to the user
        if (err) {
          res.status(500).json({ error: err })
        }
        res.status(200).json({ info: info.response })
      })
    } catch (error) {
      console.log(error)
    }
  },

  resetPassword: (req, res) => {
    const { userId, token } = req.params
    const password = req.body.password //password coming from the form the user has entered into
    User.findOne({ _id: userId }, (err, user) => {
      //find user by id
      if (err) console.log(err)
      const secret = user.password + "-" + user.createdAt //again, using the same secret(used above) to decode the token
      const payload = jwt.decode(token, secret) //decoding token using user's current password hash and createdAt value as a secret, which makes the secret very secure
      if (payload.userId == user.id) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.log(err)
          bcrypt.hash(password, salt, (err, hash) => {
            //hash the password coming in the body
            if (err) console.log(err)
            User.findOneAndUpdate(
              { _id: userId },
              { password: hash },
              (user, err) => {
                //find user and update the password field with a new hash OR replacing old password hash with a new hash
                if (err) console.log(err)
                res.status(202).json("password changed")
                receiveConfirmationEmail(userId)
              }
            )
          })
        })
      }
    })
  },

  sendRandomGratitude: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("gratitudes") //find the user
      if (!user) console.log("no user")
      const userGratitudes = user.gratitudes

      if (userGratitudes.length <= 10) {
        return res
          .status(403)
          .json({ message: "Sorry you can't opt for this thing yet" })
      } else if (userGratitudes.length > 10) {
        let gratitudesArray = userGratitudes.map((item) => {
          return {
            date: moment(item.createdAt).format("DD MMMM, YYYY"),
            gratitudeTitle: item.gratitudeTitle,
            gratitudeDescription: item.gratitudeDescription,
          }
        })
        const randomGratitudeObject =
          gratitudesArray[Math.floor(Math.random() * gratitudesArray.length)]
        const emailTemplate = randomGratitudeTemplate(
          user,
          randomGratitudeObject
        )
        // cron.schedule("30 9 * * *", () => { //send email 9:30 in the morning everyday
        transporter.sendMail(emailTemplate, (err, info) => {
          if (err) {
            res.status(500).json({ Error: err })
          }
          res.status(200).json({ info: info.response })
        })
        // })
      }
    } catch (error) {
      console.log(error)
    }
  },
}
