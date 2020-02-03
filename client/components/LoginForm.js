import React, { Component } from "react"
import validator from "validator"
import { loginUser } from "../actions/userActions"
import { connect } from "react-redux"

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        const loginData = {
            email: this.state.email,
            password: this.state.password
        }

        if (!email || !password) {
            return alert('Email and password are must.');
        }

        if (password.length < 6) {
            return alert('Password must contain 6 characters.');
        }

        if (!validator.isEmail(email)) {
            return alert('Invalid email.');
        }

        this.props.dispatch(loginUser(loginData, () => this.props.history.push("/")))
    }

    render() {
        const isAuthInProgress = this.props.auth.isAuthInProgress
        return (
            <div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="Email" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                    <p className="has-text-danger">Forgot password?</p>
                </div>
                <div className="field">
                    <p className="control">
                        {
                            isAuthInProgress ? <strong>Logging in...</strong>
                        :
                        <button onClick={this.handleSubmit} className="button is-success">
                            Login
                        </button>
                        }   
                    </p>

                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return state
}


export default connect(mapStateToProps)(LoginForm)