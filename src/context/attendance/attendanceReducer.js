import { ATTENDANCE_ERROR, GET_ATTENDANCES } from "../types.js";
export default (state, action) => {
  switch (action.type) {
    case GET_ATTENDANCES:
      return {
        ...state,
        attendances: action.payload,
        loading: false,
      };
      case ATTENDANCE_ERROR:return{
        ...state,
        error:action.payload
      }
    default:
      return state;
  }
};
