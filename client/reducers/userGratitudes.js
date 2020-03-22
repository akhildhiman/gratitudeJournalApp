const initialState = {
  isFetchingUserGratitudes: null,
  isFetchedUserGratitudes: null,
  userGratitudes: [],
  fetchingUserGratitudesError: null
}

const userGratitudes = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_USER_GRATITUDES_START":
      return {
        ...state,
        isFetchingUserGratitudes: true,
        fetchingUserGratitudesError: null
      }
    case "FETCHING_USER_GRATITUDES_SUCCESS":
      return {
        ...state,
        isFetchingUserGratitudes: false,
        isFetchedUserGratitudes: true,
        userGratitudes: action.data,
        fetchingUserGratitudesError: null
      }
    case "FETCHING_USER_GRATITUDES_ERROR":
      return {
        ...state,
        isFetchingUserGratitudes: false,
        isFetchedUserGratitudes: false,
        userGratitudesError: action.data.error
      }
    default:
      return state
  }
}

export default userGratitudes
