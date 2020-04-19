import React, { Component } from "react"
import { registerUser } from "../actions/userActions"
import { connect } from "react-redux"
import validator from "validator"
import { Link } from "react-router-dom"
import { toastError } from "../../utils/toastify"


class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, password } = this.state

    const registrationData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }

    if (!username || !email || !password) {
      return toastError("Credentials should not be empty")
    }

    if (username.length < 6) {
      return toastError("Username should be greater than 6 characters.")
    }

    if (!validator.isEmail(email)) {
      return toastError("Invalid email.")
    }

    if (password.length < 6) {
      return toastError("Password must contain 6 characters.")
    }

    this.props.dispatch(registerUser(registrationData), () => this.props.history.push("/login"))
  }

  render() {
    const isRegistrationInProgress = this.props.registration
      .isRegistrationInProgress
    return (
      <div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
              className="input"
              type="text"
              placeholder="Username"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              className="input"
              type="email"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              className="input"
              type="password"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <div className="control">
            {isRegistrationInProgress ? (
              <p>Registering...</p>
            ) : (
              <button onClick={this.handleSubmit} className="button is-success">
                Sign up
              </button>
            )}
            <Link to="/login">  
              <p className="has-text-danger">
                Already have an account? Sign In
              </p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(RegistrationForm)
