import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import NotFoundPage from "./components/NotFoundPage"
import Feed from "./components/Feed"
import { getCurrentUser } from "./actions"
import { connect } from "react-redux"

class App extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const authToken = localStorage.getItem("authToken")
        if (authToken) {
            this.props.dispatch(getCurrentUser(authToken))
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/register" component={RegistrationForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/feed" component={Feed} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(App)