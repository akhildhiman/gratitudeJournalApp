import axios from "axios";

export const registerUser = registrationData => {
  return async dispatch => {
    dispatch({ type: "REGISTRATION_STARTS" });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/register", registrationData
      );
      dispatch({
        type: "REGISTRATION_SUCCESS",
        data: { user: res.data.user }
      });
    } catch (err) {
      dispatch({
        type: "REGISTRATION_ERROR",
        data: { error: "Something went wrong" }
      });
    }
  };
};

export const loginUser = (loginData, redirect) => {
  return async dispatch => {
    dispatch({ type: "AUTH_STARTS" });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login", loginData
      );
      // console.log(loginData);
      dispatch({
        type: "AUTH_SUCCESS",
        data: { user: res.data.user } // token: res.data.token
      });
      localStorage.setItem("authToken", res.data.token);
      redirect();
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error: "Something went wrong" }
      });
    }
  };
};

export const getCurrentUser = token => {
  // console.log("2-> inside get current user thunk")
  return async dispatch => {
    dispatch({ type: "AUTH_STARTS" });
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/me", {
        headers: {
          Authorization: token
        }
      });
      dispatch({
        type: "AUTH_SUCCESS",
        data: { user: res.data.user }
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error: "Something went wrong" }
      });
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT_USER" });
  };
};

export const addGratitude = (gratitudeData, redirect) => {
  console.log("inside addGratitude action");
  return async dispatch => {
    dispatch({
      type: "ADD_GRATITUDE_STARTS"
    });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/gratitudes/new", gratitudeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.authToken}`
          }
        }
      );
      dispatch({
        type: "ADD_GRATITUDE_SUCCESS",
        data: { gratitude: res.data.gratitude }
      });
      redirect();
    } catch (err) {
      dispatch({
        type: "ADD_GRATITUDE_ERROR",
        data: { error: "Something went wrong" }
      });
    }
  };
};


// export const deleteGratitude = (id) => {
//   console.log("inside delete gratitude action")
//   return async dispatch => {
//     dispatch({ type: "DELETING_GRATITUDE_START" })
//     try {
//       const deletedGratitude = await axios.delete(`http://localhost:3000/api/v1/gratitudes/${id}/delete`)
//       dispatch({
//         type: "DELETING_GRATITUDE_SUCCESS",
//         data: deletedGratitude
//       })
//     } catch(error) {
//       dispatch({
//         type: "DELETING_GRATITUDE_FAILURE",
//         data: { error: "Something went wrong" }
//       })
//     }
//   }
// }


export const getListOfGratitudes = () => {
  console.log("inside getListOfGratitudes action");
  return async dispatch => {
    dispatch({
      type: "FETCHING_GRATITUDES_START"
    });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/gratitudes/list", {
            headers: {
                "Content-Type": "application/json"
          }
        }
      );
      dispatch({
        type: "FETCHING_GRATITUDES_SUCCESS",
        data: { gratitudes: res.data.gratitudes }
      });
    } catch (err) {
      dispatch({
        type: "FETCHING_GRATITUDES_ERROR",
        data: { error: "Something went wrong" }
      });
    }
  };  
};


export const getUserGratitudes = (id) => {
  return async dispatch => {
    dispatch({
      type: "FETCHING_USER_GRATITUDES_START",
  })
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/gratitudes/${id}`, {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      dispatch({
        type: "FETCHING_USER_GRATITUDES_SUCCESS",
        data: res.data
      })
    } catch(err) {
      dispatch({
        type: "FETCHING_USER_GRATITUDES_ERROR",
        data: { error: "Something went wrong"}
      })
    }
  }
}


// export default sendPasswordResetEmail = (email) => {
//   return async dispatch => {
//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/v1/users/createOneTimeTokenAndSendMail/${email}`,
//       )
//       dispatch({
//         type: "SEND_PASSWORD_RESET_EMAIL",
//       })
//     } catch(err) {
//       dispatch({
//         type: "PASSWORD_RESET_EMAIL_ERROR",
//         data: { error: "Could not send password reset email "}
//       })
//     }
//   }
// }








