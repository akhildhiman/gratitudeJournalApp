import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { getCurrentUser } from "./actions/users"
import { connect } from "react-redux"
import LandingPage from "./components/LandingPage"
import RegistrationForm from "./components/auth/RegistrationForm"
import LoginForm from "./components/auth/LoginForm"
import NotFoundPage from "./components/NotFoundPage"
import Feed from "./components/Feed"
import NewGratitudeForm from "./components/forms/NewGratitudeForm"
import UserProfile from "./components/UserProfile"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm"
import UserGratitudesFeed from "./components/UserGratitudesFeed"
import ResetPasswordForm from "./components/forms/ResetPasswordForm"
import EditGratitudeForm from "./components/forms/EditGratitudeForm"

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      this.props.dispatch({ type: "TOKEN_VERIFICATION_STARTS" })
      this.props.dispatch(getCurrentUser(authToken))
    }
  }

  render() {
    const { isIdentifyingToken } = this.props
    return (
      <div>
        {isIdentifyingToken ? null : (
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/register" component={RegistrationForm} />
              <Route path="/login" component={LoginForm} />

              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute
                path="/gratitude/new"
                component={NewGratitudeForm}
              />
              <Route path="/gratitude/edit/:id" component={EditGratitudeForm} />

              <PrivateRoute
                exact
                path="/profile/:username"
                component={UserProfile}
              />

              <PrivateRoute
                path="/profile/:username/gratitudes"
                component={UserGratitudesFeed}
              />
              <Route path="/forgot-password" component={ForgotPasswordForm} />
              <Route
                path="/reset-password/:userId/:token"
                component={ResetPasswordForm}
              />

              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isIdentifyingToken: state.auth.isIdentifyingToken,
})

export default connect(mapStateToProps)(App)
