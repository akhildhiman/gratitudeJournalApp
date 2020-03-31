import React, { Component } from "react";
import { connect } from "react-redux";
import { addGratitude } from "../actions/userActions";

class NewGratitudeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gratitudeTitle: "",
      gratitudeDescription: "",
      maxLength: 140
    };
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = () => {
    const gratitudeData = this.state;
    this.props.dispatch(
      addGratitude(gratitudeData, () => {
        this.props.history.push("/feed");
      })
    );
  };

  render() {
    const charactersRemaining =
      this.state.maxLength - this.state.gratitudeDescription.length;
    return (
      <div>
        <input
          onChange={this.handleChange}
          name="gratitudeTitle"
          value={this.state.gratitudeTitle}
          className="input"
          placeholder="Title"
          maxLength="100"
        />

        <textarea
          onChange={this.handleChange}
          name="gratitudeDescription"
          value={this.state.gratitudeDescription}
          className="textarea"
          placeholder="Tell us what you're grateful for today"
          maxLength="140"
        ></textarea>
        <button onClick={this.handleSubmit}>Submit</button>

        <div>Characters remaining: {charactersRemaining}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return store;
};

export default connect(mapStateToProps)(NewGratitudeForm);
