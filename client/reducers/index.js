import { combineReducers } from "redux"
import registration from "./registration"
import auth from "./auth"
import gratitude from "./gratitude"

const rootReducer = combineReducers({
    registration,
    auth,
    gratitude
})

export default rootReducer