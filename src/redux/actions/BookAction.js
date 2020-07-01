import {
  getAllBooksAction,
  postBookAction,
  deleteBookAction,
  editBookAction,
  getBookByIdAction,
  getDetailBookAction,
  getHomeBooksAction,
  getBooksByGenreAction,
  getBookByGenreOnIdAction,
  getBooksNextPageAction,
} from './actionTypes';
import {
  getAllBooks,
  getDetailBook,
  postBook,
  editBook,
  deleteBook,
} from '../../utils/http';
// import AsyncStorage from '@react-native-community/async-storage';

export const getAllBooksActionCreator = (token, body) => {
  return {
    type: getAllBooksAction,
    payload: getAllBooks(token, body),
  };
};
export const getHomeBooksActionCreator = (token, body) => {
  return {
    type: getHomeBooksAction,
    payload: getAllBooks(token, body),
  };
};
export const getBooksNextPageActionCreator = (token, body) => {
  return {
    type: getBooksNextPageAction,
    payload: getAllBooks(token, body),
  };
};
export const getDetailBookActionCreator = (token, id) => {
  return {
    type: getDetailBookAction,
    payload: getDetailBook(token, id),
  };
};
export const getBooksByGenreActionCreator = (token, body) => {
  return {
    type: getBooksByGenreAction,
    payload: getAllBooks(token, body),
  };
};
export const getBookByGenreOnIdActionCreator = id => {
  return {
    type: getBookByGenreOnIdAction,
    // eslint-disable-next-line radix
    payload: parseInt(id),
  };
};
export const getBookByIdActionCreator = id => {
  return {
    type: getBookByIdAction,
    // eslint-disable-next-line radix
    payload: parseInt(id),
  };
};

export const postBookActionCreator = (token, body) => {
  return {
    type: postBookAction,
    payload: postBook(token, body),
  };
};

export const editBookActionCreator = (token, id, body) => {
  return {
    type: editBookAction,
    payload: editBook(token, id, body),
  };
};

export const deleteBookActionCreator = (token, id) => {
  return {
    type: deleteBookAction,
    payload: deleteBook(token, id),
  };
};
