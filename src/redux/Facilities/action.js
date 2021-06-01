import { DISPLAY_BICYCLE_ROAD, DISPLAY_FACILITY, DISPLAY_INFO, DISPLAY_AIRPUMP, DISPLAY_PARKING, DISPLAY_REPAIR, DISPLAY_RENTAL, SELECT_MARKER, DISPLAY_AIR } from './type'
export const displayBicycleRoad = () => {
    return{
        type: DISPLAY_BICYCLE_ROAD,
    }
}

export const displayFacility = () => {
    return{
        type: DISPLAY_FACILITY,
    }
}

export const displayInfo = (isOpen) => {
    return {
        type: DISPLAY_INFO,
        payload: isOpen
    }
}

export const displayAirpump = () => {
    return {
        type: DISPLAY_AIRPUMP,
    }
}

export const displayParking = () => {
    return {
        type: DISPLAY_PARKING,
    }
}

export const displayRepair = () => {
    return {
        type: DISPLAY_REPAIR,
    }
}

export const displayRental = () => {
    return {
        type: DISPLAY_RENTAL,
    }
}

//마커를 클릭/선택 했을때 선택한 마커 정보 갱신
export const selectMarker = (data) => {
    return {
        type: SELECT_MARKER,
        payload: data
    }
}

export const displayAir = (isOpen) => {
    return {
        type: DISPLAY_AIR,
        payload: isOpen
    }
}