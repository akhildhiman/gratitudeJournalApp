import React, { Component } from "react"
import { getCurrentUser } from "../actions/users"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { toastError, toastSuccess, toastInfo } from "../../utils/toastify"
import profileImg from "../../public/media/profileImg.png"

class UserProfile extends Component {
  componentDidMount() {
    const authToken = localStorage.getItem("authToken")
    this.props.dispatch(getCurrentUser(authToken))
  }

  handleClick = (id) => {
    axios
      .post(`http://localhost:3000/api/v1/users/send-random-gratitude/${id}`)
      .then((res) => {
        res.status === 200 ? toastSuccess("🦄 Email sent") : null
      })
      .catch((err) => {
        if (err.response) {
          return toastError(err.response.data.message)
        }
      })
  }

  render() {
    const { params } = this.props.match
    const { username, email } = this.props

    if (username !== params.username) {
      return (
        <h1 style={{ textAlign: "center", marginop: "150px" }}>
          Sorry, Not your profile
        </h1>
      )
    } else {
      return (
        <div>
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={profileImg} alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{username}</p>
                  <p className="subtitle is-6">{email}</p>
                </div>
              </div>
              <button className="button is-success">
                <Link
                  style={{ color: "white" }}
                  to={`/profile/${username}/gratitudes`}
                >
                  My Gratitudes
                </Link>
              </button>
              <br></br>
              <br></br>
              <button
                onClick={() => {
                  this.handleClick(this.props.id)
                }}
                className="button is-success"
              >
                Send me an email
              </button>

              <span className="icon is-large has-text-info">
                <i
                  onClick={() =>
                    toastInfo(
                      "By opting in, you'll get an email everyday listing a random gratitude that you've previously added, only if you have more than ten gratitudes"
                    )
                  }
                  className="fas fa-info-circle"
                ></i>
              </span>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isIdentifyingToken: state.auth.isIdentifyingToken,
    username: state.auth.user.username,
    email: state.auth.user.email,
    id: state.auth.user._id,
  }
}

export default connect(mapStateToProps)(UserProfile)
