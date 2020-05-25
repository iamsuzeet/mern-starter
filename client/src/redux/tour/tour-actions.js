import * as actionTypes from './tour-actiontypes';
import axios from 'axios';

export const fetchTourStart = () => ({
  type: actionTypes.FETCH_TOUR_START,
});

export const fetchTourSuccess = (tours) => ({
  type: actionTypes.FETCH_TOUR_SUCCESS,
  payload: tours,
});

export const fetchTourFailure = (error) => ({
  type: actionTypes.FETCH_TOUR_FAILURE,
  payload: error,
});

export const fetchTourStartAsync = (url) => {
  return async (dispatch) => {
    dispatch(fetchTourStart());
    try {
      const res = await axios({
        method: 'GET',
        url,
        withCredentials: true,
      });
      dispatch(fetchTourSuccess(res.data.data.data));
    } catch (err) {
      dispatch(fetchTourFailure(err.message));
    }
  };
};
