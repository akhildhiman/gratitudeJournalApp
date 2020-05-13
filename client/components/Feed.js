import React, { Component } from "react"
import { connect } from "react-redux"
import { getListOfGratitudes } from "../actions/gratitudes"
import profileImg from "../../public/media/profileImg.png"

class Feed extends Component {
  componentDidMount() {
    this.props.dispatch(getListOfGratitudes())
  }

  render() {
    const { isFetchingGratitudes, gratitudeList } = this.props

    return isFetchingGratitudes ? (
      <h3>Fetching.....</h3>
    ) : (
      <div>
        {gratitudeList && gratitudeList.length ? (
          gratitudeList.map((gratitudes, id) => {
            return (
              <article className="media container is-fluid" key={id}>
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={profileImg} alt="image" />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{gratitudes.user.username}</strong>
                      <small className="has-text-danger	">says</small>
                      <br />
                      {gratitudes.gratitudeDescription}
                    </p>
                  </div>
                </div>
              </article>
            )
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>No gratitude found</h1>
        )}
        <br></br>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gratitudeList: state.gratitude.gratitudeList,
    isFetchingGratitudes: state.gratitude.isFetchingGratitudes,
  }
}

export default connect(mapStateToProps)(Feed)
