import * as actionTypes from './tour-actiontypes';

const INITIAL_STATE = {
  tours: [],
  err: null,
  isLoading: true,
};

const tourReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOUR_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_TOUR_SUCCESS:
      return {
        ...state,
        tours: action.payload,
        err: null,
        isLoading: false,
      };

    case actionTypes.FETCH_TOUR_FAILURE:
      return {
        ...state,
        tours: null,
        err: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default tourReducer;
