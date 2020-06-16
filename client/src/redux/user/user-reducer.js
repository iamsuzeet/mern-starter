import * as actionTypes from './user-actiontypes';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_START:
    case actionTypes.SIGN_UP_START:
    case actionTypes.UPDATE_USERDATA_START:
      return {
        ...state,
      };

    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
    case actionTypes.UPDATE_USERDATA_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
      };

    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isFetching: true,
      };

    case actionTypes.SIGN_IN_FAILURE:
    case actionTypes.SIGN_OUT_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
    case actionTypes.UPDATE_USERDATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default userReducer;
