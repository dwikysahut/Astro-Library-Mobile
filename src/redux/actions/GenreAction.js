import {
  getGenreAction,
  putGenreAction,
  deleteGenreAction,
  postGenreAction,
  getGenreByIdAction,
} from './actionTypes';
import {
  allGenre,
  postGenre,
  editGenre,
  deleteGenre,
  getGenreById,
} from '../../utils/http';

export const getGenreActionCreator = token => {
  return {
    type: getGenreAction,
    payload: allGenre(token),
  };
};

export const putGenreActionCreator = (token, id, body) => {
  return {
    type: putGenreAction,
    payload: editGenre(token, id, body),
  };
};

export const postGenreActionCreator = (token, body) => {
  return {
    type: postGenreAction,
    payload: postGenre(token, body),
  };
};

export const deleteGenreActionCreator = (token, id) => {
  return {
    type: deleteGenreAction,
    payload: deleteGenre(token, id),
  };
};
export const getGenreByIdActionCreator = (token, id) => {
  return {
    type: getGenreByIdAction,
    payload: getGenreById(token, id),
  };
};
