import React, { Component } from "react";
import { connect } from "react-redux";
import { getListOfGratitudes } from "../actions/userActions";

class Feed extends Component {

  componentDidMount() {
    console.log("goes to action");
    this.props.dispatch(getListOfGratitudes());
  }
  
  render() {
    const gratitudeList = this.props.gratitudeList;
    console.log(this.props)

    // const isFetchingGratitudes = this.props.isFetchingGratitudes
    // console.log(gratitudeList)
    
    return (
      <div>
        {gratitudeList &&
          gratitudeList.map(gratitudes => {
            return (
              <div>
                <p>{gratitudes.gratitudeTitle}</p>
                <p>{gratitudes.gratitudeDescription}</p>
                <br></br>
              </div>
            )
          })}
          <br></br>
      </div>
    );
  }
}

// <div className="card">
//   <header className="card-header">
//     <p className="card-header-title">
//       {/* {gratitudeTitle} */}
//     </p>
//   </header>
//   <div className="card-content">
//     <div className="content">
//       The text of the Gratitude written by the user.
//     </div>
//   </div>
//   <footer className="card-footer">
//     <a href="#" className="card-footer-item">
//       Edit
//     </a>
//     <a href="#" className="card-footer-item">
//       Delete
//     </a>
//   </footer>
// </div>

const mapStateToProps = state => {
  return { gratitudeList: state.gratitude.gratitudeList, isFetchingGratitudes: state.gratitude.isFetchingGratitudes };
};

export default connect(mapStateToProps)(Feed);
