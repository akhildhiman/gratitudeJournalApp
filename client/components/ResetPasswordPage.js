import React, { Component } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class ResetPasswordPage extends Component {
  state = {
    email: "",
    isSubmitted: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email } = this.state
    // if (!email) {

    // }
    console.log(email)
    axios
      .post(`http://localhost:3000/api/v1/users/reset-password/${email}`)
      .then(() => {
        toast.success(
          "🦄 We've sent you a password reset link. Please check your email",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        )
      })
      .catch((err) => {
        if (err) {
          toast.error("🦄 Sorry, email could not be sent!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      })
    this.setState({ email: "", isSubmitted: true })
  }

  render() {
    const { email } = this.state

    return (
      <div className="field">
        <h2 style={{ textAlign: "center" }}>
          Enter your email to receive a password reset link
        </h2>
        <br></br>
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            onChange={this.handleChange}
            name="email"
            value={email}
            type="email"
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>

        <button onClick={this.handleSubmit} className="button is-success">
          Submit
        </button>

        <br></br>

        {/* <Link to="/login">
          <p className="has-text-danger">I remember my password?</p>
        </Link> */}
      </div>
    )
  }
}

export default ResetPasswordPage
