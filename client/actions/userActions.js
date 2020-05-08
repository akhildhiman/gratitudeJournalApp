import axios from "axios"
const baseUrl = "http://localhost:3000/api/v1"
import { toastSuccess, toastError } from "../../utils/toastify"


export const registerUser = (registrationData, redirect) => {
  console.log("registrationData", registrationData)
  return async (dispatch) => {
    dispatch({ type: "REGISTRATION_STARTS" })
    try {
      const res = await axios.post(
        `${baseUrl}/users/register`,
        registrationData
      )
      dispatch({
        type: "REGISTRATION_SUCCESS",
        data: { user: res.data.user },
      })
      toastSuccess("Successfully registered")
      redirect()
    } catch (err) {
      dispatch({
        type: "REGISTRATION_ERROR",
        data: { error: err },
      })
    }
  }
}

export const loginUser = (loginData, redirect) => {
  return async (dispatch) => {
    dispatch({ type: "AUTH_STARTS" })
    try {
      const res = await axios.post(`${baseUrl}/users/login`, loginData)
      console.log("res=>", res)
      dispatch({
        type: "AUTH_SUCCESS",
        data: { user: res.data.user }
      })
      localStorage.setItem("authToken", res.data.token)
      redirect()
      toastSuccess("You are now logged in!")
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error },
      })
    }
  }
}

export const getCurrentUser = (token) => {
  // console.log("2-> inside get current user thunk")
  return async (dispatch) => {
    dispatch({ type: "AUTH_STARTS" })
    try {
      const res = await axios.get(`${baseUrl}/users/me`, {
        headers: {
          Authorization: token,
        },
      })
      dispatch({
        type: "AUTH_SUCCESS",
        data: { user: res.data.user },
      })
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error: "Something went wrong" },
      })
    }
  }
}


export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_USER" })
  }
}

export const addGratitude = (gratitudeData, redirect) => {
  console.log("inside addGratitude action")
  return async (dispatch) => {
    dispatch({
      type: "ADD_GRATITUDE_STARTS",
    })
    try {
      const res = await axios.post(`${baseUrl}/gratitudes/new`, gratitudeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.authToken}`,
        },
      })
      dispatch({
        type: "ADD_GRATITUDE_SUCCESS",
        data: { gratitude: res.data.gratitude },
      })
      redirect()
      toastSuccess("Successfully added gratitude")
    } catch (err) {
      dispatch({
        type: "ADD_GRATITUDE_ERROR",
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const getGratitude = (id) => {
  // console.log("inside get gratitude action", id)
  return async (dispatch) => {
    dispatch({ type: "FETCHING_GRATITUDE_START" })
    try {
      const res = await axios.get(`${baseUrl}/gratitudes/${id}`)
      dispatch({
        type: "FETCHING_GRATITUDE_SUCCESS",
        data: res.data.gratitude,
      })
    } catch (error) {
      dispatch({
        type: "FETCHING_GRATITUDE_FAILURE",
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const updateGratitude = (id, gratitudeData, redirect) => {
  console.log(id, gratitudeData)
  return async (dispatch) => {
    console.log("in action".gratitudeData)
    dispatch({ type: "UPDATING_GRATITUDE_START" })
    try {
      const res = await axios.put(
        `${baseUrl}/gratitudes/${id}/edit`,
        gratitudeData
      )
      console.log(res.data)
      dispatch({
        type: "UPDATING_GRATITUDE_SUCCESS",
        data: res.data,
      })
      redirect()
      toastSuccess("Successfully edited gratitude")
    } catch (error) {
      console.log(error)
      dispatch({
        type: "UPDATING_GRATITUDE_FAILURE",
        data: { error: res.data.error },
      })
    }
  }
}

export const deleteGratitude = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETING_GRATITUDE_START" })
    try {
      const res = await axios.delete(`${baseUrl}/gratitudes/${id}/delete`)
      // console.log("l156", res.data.gratitude)
      dispatch({
        type: "DELETING_GRATITUDE_SUCCESS",
        data: res.data.gratitude,
      })
      toastSuccess("Successfully deleted gratitude")
    } catch (error) {
      dispatch({
        type: "DELETING_GRATITUDE_ERROR",
        data: { error: error },
      })
    }
  }
}

export const getListOfGratitudes = () => {
  console.log("inside getListOfGratitudes action")
  return async (dispatch) => {
    dispatch({
      type: "FETCHING_GRATITUDES_START",
    })
    try {
      const res = await axios.get(`${baseUrl}/gratitudes/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({
        type: "FETCHING_GRATITUDES_SUCCESS",
        data: { gratitudes: res.data.gratitudes },
      })
    } catch (err) {
      dispatch({
        type: "FETCHING_GRATITUDES_ERROR",
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const getUserGratitudes = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "FETCHING_USER_GRATITUDES_START",
    })
    try {
      const res = await axios.get(`${baseUrl}/users/gratitudes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({
        type: "FETCHING_USER_GRATITUDES_SUCCESS",
        data: res.data.userGratitudes,
      })
    } catch (err) {
      dispatch({
        type: "FETCHING_USER_GRATITUDES_ERROR",
        data: { error: "Something went wrong" },
      })
    }
  }
}

// export default sendPasswordResetEmail = (email) => {
//   return async dispatch => {
//     try {
//       const res = await axios.post(
//         `${baseUrl}/users/createOneTimeTokenAndSendMail/${email}`,
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



