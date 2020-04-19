import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import NotFoundPage from "./components/NotFoundPage"
import Feed from "./components/Feed"
import { getCurrentUser } from "./actions/userActions"
import { connect } from "react-redux"
import NewGratitudeForm from "./components/NewGratitudeForm"
import UserProfile from "./components/UserProfile"
import PrivateRoute from "./components/PrivateRoute"
import ResetPasswordPage from "./components/ResetPasswordPage"
import UserGratitudesFeed from "./components/UserGratitudesFeed"
import UpdatePassword from "./components/UpdatePassword"
import EditGratitudeForm from "./components/EditGratitudeForm"
import Header from "./components/Header"

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      this.props.dispatch({ type: "TOKEN_VERIFICATION_STARTS" })
      // console.log("1-> App.js cdm -> token verification starts")
      this.props.dispatch(getCurrentUser(authToken))
      // console.log("App.js cdm -> action dispatched to get the current user aka /me route")
    }
  }

  render() {
    const { isIdentifyingToken } = this.props
    return (
      <div>
        {isIdentifyingToken ? (
          <h1>Please Wait</h1>
        ) : (
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
              <Route path="/reset-password" component={ResetPasswordPage} />
              <Route
                path="/update-password/:userId/:token"
                component={UpdatePassword}
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
