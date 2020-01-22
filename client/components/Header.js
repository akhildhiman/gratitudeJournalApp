import React from "react"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
        
class Header extends React.Component {
    render() {
    const isAuthenticated = this.props.auth.isAuthenticated
    return (
        <nav className="navbar is-clearfix is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item" href="https://bulma.io">
                    <h1 className="has-text-weight-semibold is-family-primary is-size-5 is-size-6-mobile is-family-sans-serif">SCRIBBLE</h1>
                </Link>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable is-active">
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                isAuthenticated ? 
                            <Link to="/" className="button is-sucess">
                                <strong>Logout</strong>
                            </Link>
                            :
                            <div>
                                <Link to="/register" className="button is-success">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-sucess">
                                    <strong>Sign in</strong>
                                </Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
}





const mapStateToProps = (state) => {
    return state
}


export default connect(mapStateToProps)(Header)