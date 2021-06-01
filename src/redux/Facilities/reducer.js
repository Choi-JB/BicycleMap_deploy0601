import { DISPLAY_BICYCLE_ROAD, DISPLAY_FACILITY, DISPLAY_INFO, DISPLAY_AIRPUMP, DISPLAY_PARKING, DISPLAY_REPAIR, DISPLAY_RENTAL, SELECT_MARKER, DISPLAY_AIR } from './type'

const initialState = {
    bicycle: false,
    airpump: false,
    parking: false,
    repair: false,
    rental: false,
    info: false,
    airstate: true,
    selectedMarker: {}
}

const facilitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_BICYCLE_ROAD:
            return {
                ...state,
                bicycle: !state.bicycle
            }
        case DISPLAY_FACILITY:
            return {
                ...state,
                facility: state.facility
            }

        case DISPLAY_AIRPUMP:
            return {
                ...state,
                airpump: !state.airpump
            }
        case DISPLAY_PARKING:
            return {
                ...state,
                parking: !state.parking
            }
        case DISPLAY_REPAIR:
            return {
                ...state,
                repair: !state.repair
            }
        case DISPLAY_RENTAL:
            return {
                ...state,
                rental: !state.rental
            }
        case DISPLAY_INFO:
            return {
                ...state,
                info: action.payload
            }
        case SELECT_MARKER:
            return {
                ...state,
                selectedMarker: action.payload
            }
        case DISPLAY_AIR:
            return{
                ...state,
                airstate: action.payload
            }
        default:
            return state;
    }
}

export default facilitiesReducer
