import {
  getAllBorrowAction,
  addBorrowAction,
  returnBookAction,
  getUserBorrowAction,
  clearBorrowAction,
} from './actionTypes';
import {
  getUserBorrow,
  addBorrow,
  getAllBorrow,
  returnBook,
} from '../../utils/http';

export const getAllBorrowActionCreator = token => {
  return {
    type: getAllBorrowAction,
    payload: getAllBorrow(token),
  };
};

export const getUserBorrowActionCreator = token => {
  return {
    type: getUserBorrowAction,
    payload: getUserBorrow(token),
  };
};

export const addBorrowActionCreator = (token, id) => {
  return {
    type: addBorrowAction,
    payload: addBorrow(token, id),
  };
};

export const returnBookActionCreator = (token, id, body) => {
  return {
    type: returnBookAction,
    payload: returnBook(token, id, body),
  };
};

export const clearBorrowActionCreator = () => {
  return {
    type: clearBorrowAction,
    payload: '',
  };
};
