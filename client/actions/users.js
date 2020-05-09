import axios from "axios"
const baseUrl = "http://localhost:3000/api/v1"
import * as actionTypes from "../actions/actionTypes"
import { toastSuccess, toastError } from "../../utils/toastify"

export const registerUser = (registrationData, redirect) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REGISTRATION_STARTS })
    try {
      const res = await axios.post(
        `${baseUrl}/users/register`,
        registrationData
      )
      dispatch({
        type: actionTypes.REGISTRATION_SUCCESS,
        data: { user: res.data.user },
      })
      toastSuccess("Successfully registered")
      redirect()
    } catch (err) {
      toastError(err.response.data.message)
      dispatch({
        type: actionTypes.REGISTRATION_ERROR,
        data: { error: err },
      })
    }
  }
}

export const loginUser = (loginData, redirect) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_STARTS })
    try {
      const res = await axios.post(`${baseUrl}/users/login`, loginData)
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        data: { user: res.data.user },
      })
      localStorage.setItem("authToken", res.data.token)
      redirect()
      toastSuccess("You are now logged in!")
    } catch (error) {
      toastError(error.response.data.message)
      dispatch({
        type: actionTypes.AUTH_ERROR,
        data: { error },
      })
    }
  }
}

export const getCurrentUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_STARTS })
    try {
      const res = await axios.get(`${baseUrl}/users/me`, {
        headers: {
          Authorization: token,
        },
      })
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        data: { user: res.data.user },
      })
    } catch (err) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_USER })
  }
}
