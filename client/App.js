import React, { Component } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import RegistrationForm from "./Components/RegistrationForm"
import LoginForm from "./Components/LoginForm"
import NotFoundPage from "./Components/NotFoundPage"

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/register" component={RegistrationForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App