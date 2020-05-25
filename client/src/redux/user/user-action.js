import * as actionTypes from './user-actiontypes';
import axios from 'axios';
import { toast } from 'react-toastify';

//sign in action
export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};

export const signInSuccess = (user) => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: actionTypes.SIGN_IN_FAILURE,
  payload: error,
});

//check user logged in

export const checkUserLoggedIn = () => ({
  type: actionTypes.CHECK_USER_LOGGEDIN,
});

//signout action

export const signOutSuccess = (msg) => ({
  type: actionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: actionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

//sign up action

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

export const signUpSuccess = (user) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: actionTypes.SIGN_UP_FAILURE,
  payload: error,
});

//update userdata action
export const updateUserStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

export const updateUserSuccess = (user) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: actionTypes.SIGN_UP_FAILURE,
  payload: error,
});

//sign in async action

export const signInStartAsync = (email, password) => {
  return (dispatch) => {
    dispatch(signInStart());
    axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 'success') {
          toast.success('Logged In', {
            autoClose: 2000,
          });
          dispatch(signInSuccess(res.data.data.user));
        }
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(signInFailure(err.message));
      });
  };
};

//sign up async action

export const signUpStartAsync = (email, password, name, passwordConfirm) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });

      if (res.data.status === 'success') {
        toast.success('Signed Up Successfully, Logging In', {
          autoClose: 1500,
        });

        setTimeout(() => {
          toast.success('Logged In', {
            autoClose: 2000,
          });
          dispatch(signUpSuccess(res.data.data.user));
        }, 2000);
      }
    } catch (err) {
      toast.warn(err.response.data.message, {
        autoClose: 2500,
      });
    }
  };
};

//check user async async action
export const checkUserLoggedInAsync = () => {
  return async (dispatch) => {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/views',
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      dispatch(signInSuccess(res.data.data.user));
    }
  };
};

//sign out async action
export const signOutStartAsync = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: '/api/v1/users/logout',

      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 'success') {
          toast.warn('Logged Out', {
            autoClose: 2000,
          });
          dispatch(signOutSuccess());
        }
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(signOutFailure(err.message));
      });
  };
};

//update user data async action
export const updateUserDataAsync = (data, type) => {
  console.log(data);

  const url =
    type === 'Password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';
  return (dispatch) => {
    dispatch(signInStart());
    axios({
      method: 'PATCH',
      url,
      data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 'success') {
          toast.success(`${type} updated successfully`, {
            autoClose: 2000,
          });
          dispatch(updateUserSuccess(res.data.data.user));
        }
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(updateUserFailure(err.message));
      });
  };
};
