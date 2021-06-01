import { combineReducers } from 'redux'

import facilitiesReducer from './Facilities/reducer'
import mapControlReducer from './MapControl/reducer'
import reportReducer from './Report/reducer'

const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    mapControl: mapControlReducer,
    report: reportReducer
})

export default rootReducer