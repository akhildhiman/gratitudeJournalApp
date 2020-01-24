import axios from "axios"


export const registerUser = (registrationData) => {
    console.log("inside register action")
    return async dispatch => {
        dispatch({ type: "REGISTRATION_STARTS" })
        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/register", registrationData)
            dispatch({
                type: "REGISTRATION_SUCCESS",
                data: { user: res.data },
            })
        } catch (err) {
            dispatch({
                type: "REGISTRATION_ERROR",
                data: { error: "Something went wrong" }
            })
        }
    }
}


export const loginUser = (loginData) => {
    console.log("inside login action")
    return async dispatch => {
        dispatch({ type: "AUTH_STARTS" })

        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/login", loginData)
            dispatch({
                type: "AUTH_SUCCESS",
                data: { user: res.data }
            })
            
            localStorage.setItem("authToken", res.data.token)

        } catch (err) {
            dispatch({
                type: "AUTH_ERROR",
                data: { error: "Something went wrong" }
            })
        }
    }
}



export const getCurrentUser = (token) => {
    console.log("inside getCurrentUser action", token)
    return async dispatch => {
        dispatch({ type: "AUTH_STARTS" })
        try {
            console.log("try block")
            const res = await axios.get("http://localhost:3000/api/v1/users/me", {
                headers: {
                    "Authorization": token
                }
            })
            dispatch({
                type: "AUTH_SUCCESS",
                data: { user: res.data }
            })
        } catch (err) {
            dispatch({
                type: "AUTH_ERROR",
                data: { error: "Something went wrong" }
            })
        }
    }
}
