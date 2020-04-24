const initialState = {
  isAuthInProgress: false,
  isAuthenticated: false,
  authError: null,
  user: {},
  isIdentifyingToken: false,
  token: localStorage.getItem("authToken") || "",
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_STARTS":
      return {
        ...state,
        isAuthInProgress: true,
        isAuthenticated: false,
        authError: null,
      }

    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthInProgress: false,
        authError: null,
        isAuthenticated: true,
        isIdentifyingToken: false,
        user: action.data.user,
      }

    case "AUTH_ERROR":
      return {
        ...state,
        isAuthInProgress: false,
        authError: action.data.error,
        isAuthenticated: false,
        user: {},
      }

    case "TOKEN_VERIFICATION_STARTS":
      return {
        ...state,
        isAuthInProgress: true,
        authError: null,
        isIdentifyingToken: true,
      }

    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        token: localStorage.removeItem("authToken"),
        user: {},
      }

    default:
      return state
  }
}

export default auth


