import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import { deleteGratitude } from "../actions/userActions"

class GratitudeCards extends Component {

  handleEdit = _id => {
    this.props.history.push(`/gratitude/edit/${_id}`)
  }

  handleDelete = _id => {
    this.props.dispatch(deleteGratitude(_id))
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
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content" style={{ border: "1px grey" }}>
              <p className="title is-5">{gratitudeTitle}</p>
              <p className="content">{gratitudeDescription}</p>
              <button
                onClick={() => {
                  this.handleEdit(_id)
                }}
                className="button is-success"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  this.handleDelete(_id)
                }}
                className="button is-success"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nothing: "nothing"
  }
}

export default compose(withRouter, connect(mapStateToProps))(GratitudeCards)
