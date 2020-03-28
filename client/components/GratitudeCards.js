import React, { Component } from "react"

class GratitudeCards extends Component {
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
            <div className="media-content">
              <p className="title is-2">{gratitudeTitle}</p>
              <p className="content">{gratitudeDescription}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GratitudeCards
