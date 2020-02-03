import axios from "axios"

export const registerUser = (registrationData) => {
    return async dispatch => {
        dispatch({ type: "REGISTRATION_STARTS" })
        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/register", registrationData)
            dispatch({
                type: "REGISTRATION_SUCCESS",
                data: { user: res.data.user },
            })
        } catch (err) {
            dispatch({
                type: "REGISTRATION_ERROR",
                data: { error: "Something went wrong" }
            })
        }

    }
}

export const loginUser = (loginData, redirect) => {
    return async dispatch => {
        dispatch({ type: "AUTH_STARTS" })

        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/login", loginData)
            console.log(loginData)
            dispatch({
                type: "AUTH_SUCCESS",
                data: { user: res.data.user }
            })
            localStorage.setItem("authToken", res.data.token)
            redirect()
        } catch (err) {
            dispatch({
                type: "AUTH_ERROR",
                data: { error: "Something went wrong" }
            })
        }
    }
}


export const getCurrentUser = (token) => {
    console.log(token)
    return async dispatch => {
        dispatch({ type: "AUTH_STARTS" })
        try {
            const res = await axios.get("http://localhost:3000/api/v1/users/me", {
                headers: {
                    "Authorization": token
                }   
            })
            dispatch({
                type: "AUTH_SUCCESS",
                data: { user: res.data.user }
            })
        } catch (err) {
            dispatch({
                type: "AUTH_ERROR",
                data: { error: "Something went wrong" }
            })
        }
    }
}



export const logoutUser = () => {
    return dispatch => {
        dispatch({type: "LOGOUT_USER"})
    }
}



export const addGratitude = (gratitudeData, redirect) => {
    console.log("inside addGratitude action")
    return async dispatch => {
        dispatch({
            type: "ADD_GRATITUDE_STARTS"
        })
        try {
            const res = await axios.post("http://localhost:3000/api/v1/gratitudes/new", gratitudeData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.authToken}`
                }
            })
            dispatch({
                type: "ADD_GRATITUDE_SUCCESS",
                data: { gratitude: res.data },
            })
            redirect()
        } catch (err) {
            dispatch({
                type: "ADD_GRATITUDE_ERROR",
                data: { error: "Something went wrong" }
            })
        }

    }
}







