import React from "react"

const RegistrationForm = () => {
    return (
        <div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Username" />
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
                    <input className="input" type="email" placeholder="Email" />
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
                    <input className="input" type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success">
                        Sign up
                   </button>
                </p>
            </div>
        </div>
    )
}



export default RegistrationForm