import React, { Component } from "react"
import { connect } from "react-redux"
import { getGratitude, updateGratitude } from "../actions/userActions"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import { toastSuccess } from "../../utils/toastify"


class EditGratitudeForm extends Component {
  state = {
    gratitudeTitle: "",
    gratitudeDescription: "",
  }

  // handleChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value,
  //   })
  // }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(getGratitude(id))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gratitude !== this.props.gratitude) {
      this.setState({
        gratitudeTitle: this.props.gratitude.gratitude.gratitudeTitle,
        gratitudeDescription: this.props.gratitude.gratitude
          .gratitudeDescription,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.props.match.params.id
    const username = this.props.auth.user.username
    const gratitudeData = this.state
    this.props.dispatch(
      updateGratitude(id, gratitudeData, () => {
        this.props.history.push(`/profile/${username}/gratitudes`)
        toastSuccess("Successfully edited")
      })
    )
  }

  render() {
    const { gratitudeTitle, gratitudeDescription } = this.state
    const { handleSubmit, handleChange } = this
    // console.log("value of this.state on first render  ", this.state.gratitudeTitle, this.state.gratitudeDescription)

    return (
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="gratitudeTitle"
          defaultValue={gratitudeTitle}
          className="input"
          maxLength="100"
        />

        <textarea
          onChange={handleChange}
          name="gratitudeDescription"
          defaultValue={gratitudeDescription}
          className="textarea"
          maxLength="140"
        />

        <button className="button is-success">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (store) => {
  return store
}

export default compose(connect(mapStateToProps)(withRouter(EditGratitudeForm)))
