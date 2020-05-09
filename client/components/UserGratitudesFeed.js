import React, { Component } from "react"
import { getCurrentUser } from "../actions/users"
import { getUserGratitudes } from "../actions/gratitudes"
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
    const { username, isFetchingUserGratitudes, userGratitudes } = this.props

    if (username !== params.username) {
      return <h1>Not your feed, mate</h1>
    }

    return isFetchingUserGratitudes ? (
      <p>Fetching....</p>
    ) : (
      <div>
        {userGratitudes && userGratitudes.length ? (
          userGratitudes.map((gratitude) => {
            return <GratitudeCards key={gratitude._id} gratitude={gratitude} />
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>No gratitude found</h1>
        )}
      </div>
    )
  }
}

const mapStateToPros = (state) => {
  return {
    isFetchingUserGratitudes: state.userGratitudes.isFetchingUserGratitudes,
    userGratitudes: state.userGratitudes.userGratitudes,
    userId: state.auth.user._id,
    username: state.auth.user.username,
  }
}

export default connect(mapStateToPros)(UserGratitudesFeed)
