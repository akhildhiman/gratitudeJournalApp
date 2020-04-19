import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { deleteGratitude } from "../actions/userActions"
import profileImg from "../../public/media/profileImg.png"
import { toastSuccess } from "../../utils/toastify"



class GratitudeCards extends Component {
  handleEdit = (_id) => {
    this.props.history.push(`/gratitude/edit/${_id}`)
  }

  handleDelete = (_id) => {
    this.props.dispatch(deleteGratitude(_id))
    toastSuccess("Deleted")

  }

  render() {
    const { _id, gratitudeTitle, gratitudeDescription } = this.props.gratitude
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={profileImg}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content" style={{ border: "1px grey" }}>
              <p className="title is-5">{gratitudeTitle}</p>
              <p className="content">{gratitudeDescription}</p>
              <div className="buttons">
                <button
                  onClick={() => {
                    this.handleEdit(_id)
                  }}
                  className="button is-success is-outlined"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    this.handleDelete(_id)
                  }}
                  className="button is-danger is-outlined"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nothing: "nothing",
  }
}

export default compose(withRouter, connect(mapStateToProps))(GratitudeCards)
