import React, { Component } from "react"
import { getCurrentUser } from "../actions/userActions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class UserProfile extends Component {
  componentDidMount() {
    const authToken = localStorage.getItem("authToken")
    this.props.dispatch(getCurrentUser(authToken))
  }

  handleClick = (id) => {
    console.log(id)
    axios
      .post(`http://localhost:3000/api/v1/users/send-random-gratitude/${id}`)
      .then(() => {
        toast.success("🦄 Email sent!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
      .catch(err => {
        if (err) {
          toast.error("🦄 Sorry, couldn't send email. Please check your internet connection", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      })
  }

  render() {
    const { params } = this.props.match
    const { username, email } = this.props

    if (username !== params.username) {
      return <h1>Sorry, Not your profile</h1>
    } else {
      return (
        <div>
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
                Send me an email listing my random gratitude
              </button>
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
