import { GET_STUDENTS } from "../types.js";
export default (state, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
