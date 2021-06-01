import { FIND_PLACE, ZOOM_MAP, UPDATE_LEVEL, SET_RADIUS, DISPLAY_NEW_FACILITY, SET_LIMIT_RADIUS } from './type'

const initialState = {
    place: {},     //지도 중심 좌표
    level: 5,        //지도 확대/축소 level
    radius: true,    //일정 반경내 시설만 표시
    newFacility: false,   //신규 신고된 시설 표시
    limitRadius:2500
}

const mapControlReducer = (state=initialState, action) => {
    switch(action.type){
        case FIND_PLACE:
            return{
                ...state,
                place: action.payload
            }
        case ZOOM_MAP:
            return{
                ...state,
                level: state.level + action.payload
            }
        case UPDATE_LEVEL:
            return{
                ...state,
                level: action.payload
            }
        case SET_RADIUS:
            return{
                ...state,
                radius: action.payload
            }
        case DISPLAY_NEW_FACILITY:
            return{
                ...state,
                newFacility: action.payload
            }
        case SET_LIMIT_RADIUS:
            return{
                ...state,
                limitRadius: action.payload
            }
        default: 
            return state;
    }
}

export default mapControlReducer
