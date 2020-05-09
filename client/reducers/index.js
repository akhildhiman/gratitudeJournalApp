import { combineReducers } from "redux"
import registration from "./registration"
import auth from "./auth"
import gratitude from "./gratitude"
import userGratitudes from "./userGratitudes"

const rootReducer = combineReducers({
  registration,
  auth,
  gratitude,
  userGratitudes,
})

export default rootReducer
