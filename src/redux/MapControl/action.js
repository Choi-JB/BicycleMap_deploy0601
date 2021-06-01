import { FIND_PLACE, ZOOM_MAP, UPDATE_LEVEL, SET_RADIUS, DISPLAY_NEW_FACILITY, SET_LIMIT_RADIUS } from './type'

export const findPlace = (coords) => {
    return{
        type: FIND_PLACE,
        payload: coords 
    }
}

export const zoomMap = (level) => {
    return{
        type: ZOOM_MAP,
        payload: level
    }
}

export const updateLevel = (level) => {
    return{
        type: UPDATE_LEVEL,
        payload: Number(level)
    }
}

export const setRadius = (set) => {
    return {
        type: SET_RADIUS,
        payload: set
    }
}

export const displayNewFacility = (set) => {
    return {
        type: DISPLAY_NEW_FACILITY,
        payload: set
    }
}

export const setLimitRadius = (set) => {
    return{
        type: SET_LIMIT_RADIUS,
        payload: set
    }
}