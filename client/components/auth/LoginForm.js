import React, { Component } from "react"
import validator from "validator"
import { loginUser } from "../../actions/users"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { toastError } from "../../../utils/toastify"

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = this.state

    const loginData = {
      email: this.state.email,
      password: this.state.password,
    }

    if (!email || !password) {
      return toastError("Email and password are must.")
    }

    if (password.length < 6) {
      return toastError("Password must contain 6 characters.")
    }

    if (!validator.isEmail(email)) {
      return toastError("Invalid email.")
    }

    this.props.dispatch(
      loginUser(loginData, () => {
        this.props.history.push("/")
      })
    )
  }

  render() {
    const { isAuthInProgress } = this.props
    return (
      <div>
        <div
          style={{ marginTop: "150px" }}
          className="columns is-flex is-vcentered is-centered"
        ></div>
        <div className="columns is-flex is-vcentered is-centered">
          <div className="control has-icons-left has-icons-right">
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
          </div>
        </div>
        <div className="columns is-flex is-vcentered is-centered">
          <div className="control has-icons-left has-icons-right">
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
          </div>
        </div>

        <div className="has-text-centered">
          {isAuthInProgress ? (
            <button className="button is-success is-loading">Login</button>
          ) : (
            <button onClick={this.handleSubmit} className="button is-success">
              Login
            </button>
          )}
        </div>
        <Link
          to="/forgot-password"
          style={{ textAlign: "center", marginTop: "50px", fontSize: "13px" }}
        >
          <p className="has-text-danger">Forgot password</p>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthInProgress: state.auth.isAuthInProgress,
  }
}

export default connect(mapStateToProps)(LoginForm)
