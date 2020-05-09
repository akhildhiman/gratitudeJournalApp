import axios from "axios"
const baseUrl = "http://localhost:3000/api/v1"
import * as actionTypes from "../actions/actionTypes"
import { toastSuccess, toastError } from "../../utils/toastify"

export const addGratitude = (gratitudeData, redirect) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_GRATITUDE_STARTS,
    })
    try {
      const res = await axios.post(`${baseUrl}/gratitudes/new`, gratitudeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.authToken}`,
        },
      })
      dispatch({
        type: actionTypes.ADD_GRATITUDE_SUCCESS,
        data: { gratitude: res.data.gratitude },
      })
      redirect()
      toastSuccess("Successfully added gratitude")
    } catch (err) {
      dispatch({
        type: actionTypes.ADD_GRATITUDE_ERROR,
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const getGratitude = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCHING_GRATITUDE_START })
    try {
      const res = await axios.get(`${baseUrl}/gratitudes/${id}`)
      dispatch({
        type: actionTypes.FETCHING_GRATITUDE_SUCCESS,
        data: res.data.gratitude,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.FETCHING_GRATITUDE_ERROR,
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const updateGratitude = (id, gratitudeData, redirect) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATING_GRATITUDE_START })
    try {
      const res = await axios.put(
        `${baseUrl}/gratitudes/${id}/edit`,
        gratitudeData
      )
      dispatch({
        type: actionTypes.UPDATING_GRATITUDE_SUCCESS,
        data: res.data,
      })
      redirect()
      toastSuccess("Successfully edited gratitude")
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATING_GRATITUDE_ERROR,
        data: { error: res.data.error },
      })
    }
  }
}

export const deleteGratitude = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETING_GRATITUDE_START })
    try {
      const res = await axios.delete(`${baseUrl}/gratitudes/${id}/delete`)
      dispatch({
        type: actionTypes.DELETING_GRATITUDE_SUCCESS,
        data: res.data.gratitude,
      })
      toastSuccess("Successfully deleted gratitude")
    } catch (error) {
      dispatch({
        type: actionTypes.DELETING_GRATITUDE_ERROR,
        data: { error: error },
      })
    }
  }
}

export const getListOfGratitudes = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCHING_GRATITUDES_START,
    })
    try {
      const res = await axios.get(`${baseUrl}/gratitudes/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({
        type: actionTypes.FETCHING_GRATITUDES_SUCCESS,
        data: { gratitudes: res.data.gratitudes },
      })
    } catch (err) {
      dispatch({
        type: actionTypes.FETCHING_GRATITUDES_ERROR,
        data: { error: "Something went wrong" },
      })
    }
  }
}

export const getUserGratitudes = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCHING_USER_GRATITUDES_START,
    })
    try {
      const res = await axios.get(`${baseUrl}/users/gratitudes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({
        type: actionTypes.FETCHING_USER_GRATITUDES_SUCCESS,
        data: res.data.userGratitudes,
      })
    } catch (err) {
      dispatch({
        type: actionTypes.FETCHING_USER_GRATITUDES_ERROR,
        data: { error: "Something went wrong" },
      })
    }
  }
}
