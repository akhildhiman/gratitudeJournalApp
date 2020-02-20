const initialState = {
    isRegistrationInProgress: false,
    isRegistered: false,
    registrationError: null,
    user: {}
}

const registration = (state=initialState, action) => {
    switch(action.type) {
        case "REGISTRATION_STARTS":
            return {...state,
                 isRegistrationInProgress: true,
                  registrationError: null
                }

        case "REGISTRATION_SUCCESS":
            return {...state,
                isRegistrationInProgress: false,
                registrationError: null,
                isRegistered: true,
                user: action.data
            }

        case "REGISTRATION_ERROR":
            return {...state,
                isRegistrationInProgress: false,
                registrationError: action.data.error,
                isRegistered: false,
                user: {}
            }

        default: 
            return state  
    }
}

export default registration






