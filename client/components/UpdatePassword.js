import React, { Component } from "react"
import axios from "axios"
import { toastSuccess, toastError } from "../../utils/toastify"

class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      confirmPassword: "",
      isSubmitted: false,
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userId, token } = this.props.match.params
    const { password } = this.state
    console.log(password)
    axios
      .post(
        `http://localhost:3000/api/v1/users/receive_new_password/${userId}/${token}`,
        { password }
      )
      .then(() => {
        toastSuccess("🦄 Password Updated successfully. You can now sign in ")
      })
      .catch((err) => {
        if (err) {
          return toastError("🦄 Sorry, please try again")
        }
      })
    this.setState({ isSubmitted: true })
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Update your password</h2>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              type="email"
              placeholder="Enter new password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              onChange={this.handleChange}
              name="confirmPassword"
              value={this.state.confirmPassword}
              type="email"
              placeholder="Confirm password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <button onClick={this.handleSubmit} className="button is-success">
          Submit
        </button>
      </div>
    )
  }
}

export default UpdatePassword
