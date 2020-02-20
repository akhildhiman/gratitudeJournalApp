const initialState = {
    isAddingGratitude: false,
    gratitudeError: null,
    gratitude: {},
    isFetchingGratitudes: null,
    hasFetchedGratitudes: null,
    fetchingGratitudesError: null,
    gratitudeList: []
}

const gratitude = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_GRATITUDE_STARTS":
            return { ...state, isAddingGratitude: true, gratitudeError: null }
        case "ADD_GRATITUDE_SUCCESS":
            return {...state, isAddingGratitude: false, gratitudeError: null, gratitude: action.data}
        case "ADD_GRATITUDE_ERROR":
            return {...state, isAddingGratitude: false, gratitudeError: action.data.error, gratitude: {}}
        case "FETCHING_GRATITUDES_START":
            return {...state, isFetchingGratitudes: true, hasFetchedGratitudes: false, fetchingGratitudesError: null}
        case "FETCHING_GRATITUDES_SUCCESS":
            return {...state, isFetchingGratitudes: false, hasFetchedGratitudes: true, fetchingGratitudesError: null, gratitudeList: action.data.gratitudes}
        case "FETCHING_GRATITUDES_ERROR":
            return {...state, isFetchingGratitudes: false, hasFetchedGratitudes: false, fetchingGratitudesError: action.data.error}
        default:
            return state
    }
}


export default gratitude