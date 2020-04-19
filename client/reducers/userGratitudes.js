const initialState = {
  isFetchingUserGratitudes: null,
  isFetchedUserGratitudes: null,
  userGratitudes: [],
  fetchingUserGratitudesError: null,
  isDeletingGratitude: false,
  isDeletedGratitude: false,
  deletingError: false,
}

const userGratitudes = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_USER_GRATITUDES_START":
      return {
        ...state,
        isFetchingUserGratitudes: true,
        fetchingUserGratitudesError: null,
      }
    case "FETCHING_USER_GRATITUDES_SUCCESS":
      return {
        ...state,
        isFetchingUserGratitudes: false,
        isFetchedUserGratitudes: true,
        userGratitudes: action.data,
        fetchingUserGratitudesError: null,
      }
    case "FETCHING_USER_GRATITUDES_ERROR":
      return {
        ...state,
        isFetchingUserGratitudes: false,
        isFetchedUserGratitudes: false,
        fetchingUserGratitudesError: action.data.error,
      }
    case "DELETING_GRATITUDE_START":
      return {
        ...state,
        isDeletingGratitude: true,
        deletingError: null,
      }
    case "DELETING_GRATITUDE_SUCCESS":
      const filteredGratitudeList = state.userGratitudes.filter(
        (gratitude) => gratitude._id !== action.data._id
      )
      return {
        ...state,
        isDeletingGratitude: false,
        isDeletedGratitude: true,
        userGratitudes: filteredGratitudeList,
        deletingError: null,
      }
    case "DELETING_GRATITUDE_ERROR":
      return {
        ...state,
        isDeletingGratitude: false,
        deletingError: action.data.error,
      }
    default:
      return state
  }
}

export default userGratitudes
