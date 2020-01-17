import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <h1 className="has-text-weight-semibold is-family-primary is-size-5 is-size-6-mobile is-family-sans-serif">Gratitude Journal App</h1>
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable">
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/register" className="button is-sucess">
                                <strong>Sign up</strong>
                            </Link>
                            <Link to="/login" className="button is-success">
                                <strong>Log in</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}










export default Header