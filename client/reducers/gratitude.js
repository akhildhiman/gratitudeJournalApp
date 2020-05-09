const initialState = {
  isAddingGratitude: false,
  gratitudeError: null,
  gratitude: {},
  isFetchingGratitudes: null,
  hasFetchedGratitudes: null,
  fetchingGratitudesError: null,
  isUpdatingGratitude: false,
  isUpdatedGratitude: false,
  updatingError: null,
  isFetchingGratitude: false,
  isFetchedGratitude: false,
  fetchingGratitudeError: null,
  isDeletingGratitudes: false,
  isDeletedGratitudes: false,
  deletingError: null,
  gratitudeList: [],
}

const gratitude = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_GRATITUDE_STARTS":
      return { ...state, isAddingGratitude: true, gratitudeError: null }
    case "ADD_GRATITUDE_SUCCESS":
      return {
        ...state,
        isAddingGratitude: false,
        gratitudeError: null,
        gratitude: action.data,
      }
    case "ADD_GRATITUDE_ERROR":
      return {
        ...state,
        isAddingGratitude: false,
        gratitudeError: action.data.error,
        gratitude: {},
      }
    case "FETCHING_GRATITUDES_START":
      return {
        ...state,
        isFetchingGratitudes: true,
        hasFetchedGratitudes: false,
        fetchingGratitudesError: null,
      }
    case "FETCHING_GRATITUDES_SUCCESS":
      return {
        ...state,
        isFetchingGratitudes: false,
        hasFetchedGratitudes: true,
        fetchingGratitudesError: null,
        gratitudeList: action.data.gratitudes,
      }
    case "FETCHING_GRATITUDES_ERROR":
      return {
        ...state,
        isFetchingGratitudes: false,
        hasFetchedGratitudes: false,
        fetchingGratitudesError: action.data.error,
      }
    case "UPDATING_GRATITUDE_START":
      return {
        ...state,
        isUpdatingGratitude: true,
        isUpdatedGratitude: false,
        updatingError: null,
      }
    case "UPDATING_GRATITUDE_SUCCESS":
      return {
        ...state,
        isUpdatingGratitude: false,
        isUpdatedGratitude: true,
        updatingError: null,
        gratitudeList: action.data.gratitudes,
      }
    case "UPDATING_GRATITUDE_FAILURE":
      return {
        ...state,
        isUpdatingGratitude: false,
        isUpdatedGratitude: false,
        updatingError: action.data.error,
      }

    case "FETCHING_GRATITUDE_START":
      return {
        ...state,
        isFetchingGratitude: true,
        isFetchedGratitude: false,
        fetchingGratitudeError: null,
      }
    case "FETCHING_GRATITUDE_SUCCESS":
      return {
        ...state,
        isFetchingGratitude: false,
        isFetchedGratitude: true,
        fetchingGratitudeError: null,
        gratitude: action.data,
      }
    case "FETCHING_GRATITUDE_FAILURE":
      return {
        ...state,
        isFetchingGratitude: false,
        isFetchedGratitude: false,
        fetchingGratitudeError: action.data.error,
      }
    default:
      return state
  }
}

export default gratitude
