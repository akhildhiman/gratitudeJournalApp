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
import Header from "../client/components/Header"
import UserProfile from "./components/UserProfile"
// import PrivateRoute from "./components/PrivateRoute"



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
        const isIdentifyingToken = this.props.auth.isIdentifyingToken
        return (
            <div>

                {
                    isIdentifyingToken ? null
                        :
                        <Router>
                             {/* <Header /> */}
                            <Switch>
                                <Route exact path="/" component={LandingPage} />
                                <Route path="/register" component={RegistrationForm} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/feed" component={Feed} />
                                {/* <PrivateRoute path="/gratitude/new" component={NewGratitudeForm} /> */}
                                <Route path="/profile" component={UserProfile} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </Router>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(App)