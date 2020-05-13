import React, { Component } from "react"
import axios from "axios"
import { toastSuccess, toastError } from "../../../utils/toastify"

class ResetPasswordForm extends Component {
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
    axios
      .post(
        `http://localhost:3000/api/v1/users/reset-password/${userId}/${token}`,
        { password }
      )
      .then((res) => {
        return toastSuccess(
          "🦄 Password Updated successfully. You can now sign in "
        )
      })
      .catch((err) => {
        return toastError(err.response.data.message)
      })
    this.setState({ password: "", confirmPassword: "", isSubmitted: true })
    this.props.history.push("/")
  }

  render() {
    return (
      // <div>
      //   <div className="field">
      //     <p className="control has-icons-left has-icons-right">
      // <input
      //   className="input"
      //   onChange={this.handleChange}
      //   name="password"
      //   value={this.state.password}
      //   type="password"
      //   placeholder="Enter new password"
      // />
      //       <span className="icon is-small is-left">
      //         <i className="fas fa-envelope"></i>
      //       </span>
      //       <span className="icon is-small is-right">
      //         <i className="fas fa-check"></i>
      //       </span>
      //     </p>
      //   </div>
      //   <div className="field">
      //     <p className="control has-icons-left has-icons-right">
      // <input
      //   className="input"
      //   onChange={this.handleChange}
      //   name="confirmPassword"
      //   value={this.state.confirmPassword}
      //   type="password"
      //   placeholder="Confirm password"
      // />
      //       <span className="icon is-small is-left">
      //         <i className="fas fa-envelope"></i>
      //       </span>
      //       <span className="icon is-small is-right">
      //         <i className="fas fa-check"></i>
      //       </span>
      //     </p>
      //   </div>
      //   <button onClick={this.handleSubmit} className="button is-success">
      //     Submit
      //   </button>
      // </div>

      <div>
        <div
          style={{ marginTop: "150px" }}
          className="columns is-flex is-vcentered is-centered"
        >
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              type="password"
              placeholder="Enter new password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="columns is-flex is-vcentered is-centered">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              onChange={this.handleChange}
              name="confirmPassword"
              value={this.state.confirmPassword}
              type="password"
              placeholder="Confirm password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="has-text-centered">
          <button onClick={this.handleSubmit} className="button is-success">
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default ResetPasswordForm
