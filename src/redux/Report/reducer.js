import {
  DISPLAY_OLD_REPORT,
  DISPLAY_NEW_REPORT,
  DISPLAY_REPORT_DETAIL,
  REPORT_MODE,
  SET_LATLNG,
  SET_DETAILADDR,
  ALERT_MESSAGE
} from "./type";

const initialState = {
  oldFacilityReport: false,
  newFacilityReport: false,
  reportDetail: false,

  reportMode: false,
  reportlatlng: {},
  reportAddress: "",
  message: {
    type: "",
    msg: ""
  }
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_OLD_REPORT:
      return {
        ...state,
        oldFacilityReport: action.payload
      };
    case DISPLAY_NEW_REPORT:
      return {
        ...state,
        newFacilityReport: action.payload
      };
    case DISPLAY_REPORT_DETAIL:
      return {
        ...state,
        reportDetail: action.payload
      };
    case REPORT_MODE:
      return {
        ...state,
        reportMode: !state.reportMode
      };
    case SET_LATLNG:
      return {
        ...state,
        reportlatlng: action.payload
      };
    case SET_DETAILADDR:
      return {
        ...state,
        reportAddress: action.payload
      };
    case ALERT_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export default reportReducer;
