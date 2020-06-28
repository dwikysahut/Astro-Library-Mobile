import {
  getUserAction,
  logoutUserAction,
  loginUserAction,
  registerUserAction,
  deleteUserAction,
  refreshTokenAction,
  putUserAction,
} from './actionTypes';
import {
  allUser,
  loginUser,
  registerUser,
  deleteUser,
  deleteToken,
  refreshToken,
  editUser,
} from '../../utils/http';

export const getUserActionCreator = token => {
  return {
    type: getUserAction,
    payload: allUser(token),
  };
};

export const loginUserActionCreator = body => {
  return {
    type: loginUserAction,
    payload: loginUser(body),
  };
};
export const registerUserActionCreator = body => {
  return {
    type: registerUserAction,
    payload: registerUser(body),
  };
};

export const deleteUserActionCreator = (token, id) => {
  return {
    type: deleteUserAction,
    payload: deleteUser(token, id),
  };
};
export const putUserActionCreator = (token, id, body) => {
  return {
    type: putUserAction,
    payload: editUser(token, id, body),
  };
};
export const logoutUserActionCreator = token => {
  return {
    type: logoutUserAction,
    payload: deleteToken(token),
  };
};

export const refreshTokenActionCreator = body => {
  return {
    type: refreshTokenAction,
    payload: refreshToken(body),
  };
};
