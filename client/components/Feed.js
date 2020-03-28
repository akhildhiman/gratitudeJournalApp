import React, { Component } from "react"
import { connect } from "react-redux"
import { getListOfGratitudes } from "../actions/userActions"

class Feed extends Component {
  componentDidMount() {
    console.log("goes to action")
    this.props.dispatch(getListOfGratitudes())
  }

  render() {
    const { isFetchingGratitudes, gratitudeList } = this.props

    return isFetchingGratitudes ? (
      <h1>Fetching.....</h1>
    ) : (
      <div>
        {gratitudeList.map(gratitudes => {
          return (
            <div key={gratitudes._id}>
              <p style={{ color: "red" }}>{gratitudes.user.username}</p>
              <p>{gratitudes.gratitudeTitle}</p>
              <p>{gratitudes.gratitudeDescription}</p>
              <br></br>
            </div>
          )
        })}
        <br></br>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gratitudeList: state.gratitude.gratitudeList,
    isFetchingGratitudes: state.gratitude.isFetchingGratitudes
  }
}

export default connect(mapStateToProps)(Feed)
