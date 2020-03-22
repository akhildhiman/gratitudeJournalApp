import React, { Component } from "react";
import { getCurrentUser } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

class UserProfile extends Component {

  componentDidMount() {
    const authToken = localStorage.getItem("authToken")
    this.props.dispatch(getCurrentUser(authToken))
  }

  render() { 
    const {isIdentifyingToken, username, email} = this.props
    
    return (
      <div>
      {
            isIdentifyingToken ? null :
            (
              <div className="card">  
              
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        src="https://bulma.io/images/placeholders/96x96.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>  
                  <div className="media-content">
                    <p className="title is-4">{username}</p>
                    <p className="subtitle is-6">{email}</p>
                  </div>
                </div>
  
                <Link to={`/profile/${username}/gratitudes`}>
                  My Gratitudes
                </Link>
              </div>
            </div>
            )
      }
      </div>
    )
  }
}
    

const mapStateToProps = (state) => {
  return {
    isIdentifyingToken: state.auth.isIdentifyingToken,
    username: state.auth.user.username,
    email: state.auth.user.email
  }
}

export default connect(mapStateToProps)(UserProfile)
