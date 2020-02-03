import React from "react";
import { connect } from "react-redux";

const Feed = () => {
  // const gratitudeTitle = (props.gratitude && props.gratitude.gratitude.gratitude.gratitudeTitle)
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          Gratitude card by username
          {/* {gratitudeTitle} */}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          The text of the Gratitude written by the user.
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Edit
        </a>
        <a href="#" className="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  );
};


const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Feed);
