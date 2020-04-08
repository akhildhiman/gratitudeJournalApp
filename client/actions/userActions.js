import axios from "axios"

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

export const verifyUsername = (username) => {
  return async dispatch => {
    dispatch({ type: "VERIFYING_USERNAME_STARTS" });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/login", username
      );
      dispatch({
        type: "VERIFYING_USERNAME_SUCCESS",
        data: { user: res.data.user } // token: res.data.token
      });
    } catch (err) {
      dispatch({
        type: "VERIFYING_USERNAME_ERROR",
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



export const getGratitude = (id) => {
  // console.log("inside get gratitude action", id)
  return async dispatch => {
    dispatch( { type: "FETCHING_GRATITUDE_START" })
    try {
    const res = await axios.get(`http://localhost:3000/api/v1/gratitudes/${id}`)
    dispatch({
      type: "FETCHING_GRATITUDE_SUCCESS",
      data: res.data.gratitude
    })
  } catch(error) {
    dispatch({
      type: "FETCHING_GRATITUDE_FAILURE",
      data: { error: "Something went wrong"}
    })
  } 
}
}


export const updateGratitude = (id, gratitudeData, redirect) => {
  console.log(id, gratitudeData)
  return async dispatch => {
    console.log("in action". gratitudeData)
    dispatch( { type: "UPDATING_GRATITUDE_START" })
    try {
    const res = await axios.put(`http://localhost:3000/api/v1/gratitudes/${id}/edit`, gratitudeData)
    console.log(res.data)
    dispatch({
      type: "UPDATING_GRATITUDE_SUCCESS",
      data: res.data
    })
    redirect()
  } catch(error) {
    console.log(error)
    dispatch({
      type: "UPDATING_GRATITUDE_FAILURE",
      data: { error: res.data.error }
    })
  } 
 }
}


export const deleteGratitude = (id) => {
  return async dispatch => {
    dispatch({ type: "DELETING_GRATITUDE_START" })
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/gratitudes/${id}/delete`)
      // console.log("l156", res.data.gratitude)
      dispatch({
        type: "DELETING_GRATITUDE_SUCCESS",
        data: res.data.gratitude, 
      })
    } catch(error) {
      dispatch({
        type: "DELETING_GRATITUDE_ERROR",
        data: { error: error }
      })
    }
  }
}


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
        data: res.data.userGratitudes
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