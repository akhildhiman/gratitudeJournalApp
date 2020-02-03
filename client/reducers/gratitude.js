const initialState = {
    isAddingGratitude: false,
    gratitudeError: null,
    gratitude: null
}


const gratitude = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_GRATITUDE_STARTS":
            return { ...state, isAddingGratitude: true, gratitudeError: null }
        case "ADD_GRATITUDE_SUCCESS":
            return {...state, isAddingGratitude: false, gratitudeError: null, gratitude: action.data}
        case "ADD_GRATITUDE_ERROR":
            return {...state, isAddingGratitude: false, gratitudeError: action.data.error, gratitude: null}
        default:
            return state
    }
}


export default gratitude