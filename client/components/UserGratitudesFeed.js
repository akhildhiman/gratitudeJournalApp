import React, { Component } from "react"
import { getUserGratitudes, getCurrentUser } from "../actions/userActions"
import { connect } from "react-redux"
import GratitudeCards from "./GratitudeCards"

class UserGratitudesFeed extends Component {
  componentDidMount() {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
      this.props.dispatch(getCurrentUser(authToken))
      if (this.props && this.props.userId) {
        this.props.dispatch(getUserGratitudes(this.props.userId))
      } else {
        return null
      }
    }
  }


  render() {
    const { params } = this.props.match
    const { username, isFetchingUserGratitudes, userGratitudes  } = this.props
    
    if (username !== params.username) {
      return <h1>Not your feed, mate</h1>
    }
    
    return isFetchingUserGratitudes ? (
      <p>Fetching....</p>
    ) : (
      <div>
        {userGratitudes &&
          userGratitudes.map((gratitude) => {
            return <GratitudeCards key={gratitude._id} gratitude={gratitude} />
          })}
      </div>
    )
  }
}


const mapStateToPros = (state) => {
  return {
    isFetchingUserGratitudes: state.userGratitudes.isFetchingUserGratitudes,
    userGratitudes: state.userGratitudes.userGratitudes,
    userId: state.auth.user._id,
    username: state.auth.user.username
  }
}

export default connect(mapStateToPros)(UserGratitudesFeed)

