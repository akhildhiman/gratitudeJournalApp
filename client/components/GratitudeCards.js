import React, { Component } from "react"
import { connect } from "react-redux"
import { deleteGratitude } from "../actions/userActions"

class GratitudeCards extends Component {

  // handleDelete = (_id) => {
  //   console.log("inside handledelete")
  //   this.props.dispatch(deleteGratitude(_id))
  // }

  render() {
    const { gratitudeTitle, gratitudeDescription } = this.props.gratitude
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
            <div className="media-content" style={{border: "1px grey"}}>
              <p className="title is-5">{gratitudeTitle}</p>
              <p className="content">{gratitudeDescription}</p>
              <button className="button is-success">Edit</button>
              {/* <button onClick={this.handleDelete(_id)} className="button is-success">Delete</button> */}
              <button className="button is-success">Delete</button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default GratitudeCards
