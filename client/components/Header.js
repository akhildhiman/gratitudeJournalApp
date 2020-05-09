import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../actions/users"

class Header extends React.Component {
  handleLogout = () => {
    this.props.dispatch(logoutUser())
    this.props.history.push("/")
  }

  render() {
    const { isAuthenticated, username } = this.props
    return (
      <nav
        className="navbar is-clearfix is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand"></div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item  is-hoverable is-active"></div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isAuthenticated ? (
                  <div>
                    <button
                      className="button is-danger is-outlined"
                      onClick={this.handleLogout}
                    >
                      <strong>Logout</strong>
                    </button>

                    <Link
                      to={`/profile/${username}`}
                      className="button is-success is-outlined"
                    >
                      <strong>{username}</strong>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/register" className="button is-success">
                      <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-sucess">
                      <strong>Sign in</strong>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user.username,
  }
}

export default withRouter(connect(mapStateToProps)(Header))
