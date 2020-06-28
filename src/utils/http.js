import Axios from 'axios';
import qs from 'qs';
import {REACT_APP_API} from 'react-native-dotenv';
// const URL_BASE = 'http://10.0.2.2:8080';
const URL_BASE = REACT_APP_API;
// process.env.REACT_APP_API; //localhost:3000/books?title=harry potter
// const URL_API = 'http://localhost:8080'

//login register
export const loginUser = body => {
  return Axios.post(`${URL_BASE}/auth/login`, body);
};

export const registerUser = body => {
  return Axios.post(`${URL_BASE}/auth/register`, body);
};

export const allUser = token => {
  return Axios.get(`${URL_BASE}/auth/user/all`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const editUser = (token, id, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  return Axios.put(`${URL_BASE}/auth/user/${id}`, body, option);
};
export const deleteUser = (token, id) => {
  return Axios.delete(`${URL_BASE}/auth/user/delete/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};

//book

export const getAllBooks = (token, body) => {
  // const option = {
  //   headers: {
  //     Authorization: token,
  //     // 'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  // };
  if (body) {
    return Axios.get(`${URL_BASE}/book?${qs.stringify(body)}`);
  }

  return Axios.get(`${URL_BASE}/book`);
};
export const getDetailBook = (token, id) => {
  // axios sifatnya asyncronous
  return Axios.get(`${URL_BASE}/book/detail/item/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const getBookById = (token, id) => {
  // axios sifatnya asyncronous
  return Axios.get(`${URL_BASE}/book/detail/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const postBook = (token, body) => {
  const option = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };
  return Axios.post(`${URL_BASE}/book`, body, option);
};
export const editBook = (token, id, body) => {
  const option = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };
  return Axios.put(`${URL_BASE}/book/edit/${id}`, body, option);
};
export const deleteBook = (token, id) => {
  return Axios.delete(`${URL_BASE}/book/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};

//genre

export const allGenre = token => {
  return Axios.get(`${URL_BASE}/data/genre`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const deleteGenre = (token, id) => {
  return Axios.delete(`${URL_BASE}/data/genre/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const postGenre = (token, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  return Axios.post(`${URL_BASE}/data/genre`, body, option);
};

export const editGenre = (token, id, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  return Axios.put(`${URL_BASE}/data/genre/${id}`, body, option);
};
export const getGenreById = (token, id) => {
  // axios sifatnya asyncronous
  return Axios.get(`${URL_BASE}/data/genre/detail/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
//author
export const allAuthor = token => {
  return Axios.get(`${URL_BASE}/data/author`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};

export const deleteAuthor = (token, id) => {
  return Axios.delete(`${URL_BASE}/data/author/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const postAuthor = (token, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  return Axios.post(`${URL_BASE}/data/author`, body, option);
};

export const editAuthor = (token, id, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  return Axios.put(`${URL_BASE}/data/author/${id}`, body, option);
};
export const getAuthorById = (token, id) => {
  // axios sifatnya asyncronous
  return Axios.get(`${URL_BASE}/data/author/detail/${id}`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};

//borrow

export const getAllBorrow = token => {
  return Axios.get(`${URL_BASE}/book/borrow/list`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const getUserBorrow = token => {
  return Axios.get(`${URL_BASE}/book/borrow/user`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
export const addBorrow = (token, id, body) => {
  const option = {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };
  return Axios.post(`${URL_BASE}/book/borrow/user/${id}`, body, option);
};

export const returnBook = (token, id, body) => {
  return Axios.put(`${URL_BASE}/book/borrow/${id}`, body, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};
//logout
export const deleteToken = token => {
  return Axios.delete(`${URL_BASE}/auth/logout/`, {
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
};

export const refreshToken = body => {
  return Axios.post(`${URL_BASE}/auth/token/`, body);
  // {
  // 	headers: {
  // 		'Authorization': token
  // 		// 'Content-Type': 'application/x-www-form-urlencoded'
  // 	}
  // })
};
