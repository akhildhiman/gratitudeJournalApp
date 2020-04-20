const initialState = {
  isRegistrationInProgress: false,
  isRegistered: false,
  registrationError: null,
  user: {},
  isValidating: false,
  isValidated: false,
  validationError: null,
  message: "",
}

const registration = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTRATION_STARTS":
      return {
        ...state,
        isRegistrationInProgress: true,
        registrationError: null,
      }

    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        isRegistrationInProgress: false,
        registrationError: null,
        isRegistered: true,
        user: action.data,
      }

    case "REGISTRATION_ERROR":
      return {
        ...state,
        isRegistrationInProgress: false,
        registrationError: action.data.error,
        isRegistered: false,
        user: {},
      }
    case "CHECK_VALID_USER_STARTS":
      return {
        ...state,
        isValidating: true,
        isValidated: false,
        validationError: null,
      }
    case "CHECK_VALID_USER_SUCCESS":
      return {
        ...state,
        isValidating: false,
        isValidated: true,
        message: action.data.message,
      }
    case "CHECK_VALID_USER_ERROR":
      return {
        ...state,
        validationError: action.data.error,
      }

    default:
      return state
  }
}

export default registration
