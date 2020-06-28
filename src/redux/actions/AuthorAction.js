import {
  getAuthorAction,
  putAuthorAction,
  deleteAuthorAction,
  postAuthorAction,
  getAuthorByIdAction,
} from './actionTypes';
import {
  allAuthor,
  postAuthor,
  editAuthor,
  deleteAuthor,
  getAuthorById,
} from '../../utils/http';

export const getAuthorActionCreator = token => {
  return {
    type: getAuthorAction,
    payload: allAuthor(token),
  };
};

export const putAuthorActionCreator = (token, id, body) => {
  return {
    type: putAuthorAction,
    payload: editAuthor(token, id, body),
  };
};

export const postAuthorActionCreator = (token, body) => {
  return {
    type: postAuthorAction,
    payload: postAuthor(token, body),
  };
};

export const deleteAuthorActionCreator = (token, id) => {
  return {
    type: deleteAuthorAction,
    payload: deleteAuthor(token, id),
  };
};
export const getAuthorActionByIdCreator = (token, id) => {
  return {
    type: getAuthorByIdAction,
    payload: getAuthorById(token, id),
  };
};
