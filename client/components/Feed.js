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
        {gratitudeList.map((gratitudes) => {
          return (
            <article className="media container is-fluid">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{gratitudes.user.username}</strong> <small className="has-text-danger	">says</small>{" "}
                    {/* <small>31m</small> */}
                    <br />
                    {gratitudes.gratitudeDescription}
                  </p>
                </div>
                {/* <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-reply"></i>
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-retweet"></i>
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-heart"></i>
                      </span>
                    </a>
                  </div>
                </nav> */}
              </div>
              {/* <div className="media-right">
                <button className="delete"></button>
              </div> */}
            </article>
          )
        })}
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

// <div key={gratitudes._id}>
//   <p style={{ color: "red" }}>{gratitudes.user.username} says</p>
//   <p>{gratitudes.gratitudeTitle}</p>
//   <p>{gratitudes.gratitudeDescription}</p>
//   <br></br>
// </div>
