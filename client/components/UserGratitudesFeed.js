import React, { Component } from "react"
import { getUserGratitudes, getCurrentUser } from "../actions/userActions"
import { connect } from "react-redux"
import GratitudeCards from "./GratitudeCards"

class UserGratitudesFeed extends Component {
  // constructor() {
  //     console.log("constructor called")
  //     super()
  //   }
  //   UNSAFE_componentWillMount() {
  //       console.log("cwm called")
  //   }

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
      
    const { isFetchingUserGratitudes, userGratitudes } = this.props
    // console.log(userGratitudes ,"yo")
    return (
        isFetchingUserGratitudes ? <p>Fetching....</p>
      
        :

      <div>
        {        
            userGratitudes && userGratitudes.map(gratitude => {
                // console.log(gratitude)
                return <GratitudeCards key={gratitude._id} gratitude={gratitude} />
            })
        
        }
      </div>
    )
  }
}

const mapStateToPros = state => {
  return {
    isFetchingUserGratitudes: state.userGratitudes.isFetchingUserGratitudes,
    userGratitudes: state.userGratitudes.userGratitudes.userGratitudes,
    userId: state.auth.user._id
  }
}

export default connect(mapStateToPros)(UserGratitudesFeed)
