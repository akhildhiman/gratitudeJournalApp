const initialState = {
    isAuthInProgress: false,
    isAuthenticated: false,
    authError: null,
    user: null,
    isIdentifyingToken: false,
    token: localStorage.getItem("authToken") || ""
}


const auth = (state=initialState, action) => {
    switch(action.type) {
        case "AUTH_STARTS":
            return {...state,
                 isAuthInProgress: true,
                 authError: null
            }

        case "AUTH_SUCCESS":
            return {...state,
                isAuthInProgress: false,
                authError: null,
                isAuthenticated: true,
                user: action.data.user,
                isIdentifyingToken: false,
                // token: action.data.token
            }

        case "AUTH_ERROR":
            return {...state,
                isAuthInProgress: false,
                authError: action.data.error,
                isAuthenticated: false,
                user: null
            }

        case "TOKEN_VERIFICATION_STARTS":
            return {...state,
                isAuthInProgress: true,
                authError: null,
                isIdentifyingToken: true
            } 
                
        case "LOGOUT_USER":
            return {...state,
            isAuthenticated: false,
            token: localStorage.removeItem("authToken"),
            user: null
        }  

        default:
            return state
    }
}


export default auth






