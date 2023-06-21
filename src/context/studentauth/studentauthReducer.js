import {
  STUDENTREGISTER_SUCCESS,
  STUDENTREGISTER_FAIL,
  STUDENT_LOADED,
  STUDENTAUTH_ERROR,
  STUDENTLOGIN_SUCCESS,
  STUDENTLOGIN_FAIL,
  STUDENTLOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case STUDENT_LOADED:
      return {
        ...state,
        isAuthenticatedStudent: true,
        studentloading: false,
        student: action.payload
      };
    case STUDENTREGISTER_SUCCESS:
    case STUDENTLOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticatedStudent: true,
        studentloading: false
      };
    case STUDENTREGISTER_FAIL:
    case STUDENTAUTH_ERROR:
    case STUDENTLOGIN_FAIL:
    case STUDENTLOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticatedStudent: false,
        studentloading: false,
        student: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
