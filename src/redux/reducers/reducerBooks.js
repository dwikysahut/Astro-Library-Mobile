/* eslint-disable no-shadow */
/* eslint-disable radix */
// berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
import {
  getAllBooksAction,
  pending,
  rejected,
  fulfilled,
  postBookAction,
  editBookAction,
  deleteBookAction,
  getDetailBookAction,
  getBookByIdAction,
  getHomeBooksAction,
  getBooksByGenreAction,
  getBookByGenreOnIdAction,
  getBooksNextPageAction,
} from '../actions/actionTypes';

const initialValue = {
  data: [],
  pagination: [],
  name: '',
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  errorToken: '',
  dataDetail: [],
  dataObj: {},
  dataById: [],
  dataHome: [],
  dataByGenre: [],
  paginationByGenre: [],
}; // biar tidak undefined

const dataBook = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllBooksAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.message,
      };
    case getAllBooksAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination,
      };
    case getBooksNextPageAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBooksNextPageAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.message,
      };
    case getBooksNextPageAction + fulfilled:
      const dataPage = prevState.data.concat(action.payload.data.data);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: dataPage,
        pagination: action.payload.data.pagination,
      };
    case getBooksByGenreAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBooksByGenreAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.message,
      };
    case getBooksByGenreAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataByGenre: action.payload.data.data,
        paginationByGenre: action.payload.data.pagination,
      };
    case getHomeBooksAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getHomeBooksAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.message,
      };
    case getHomeBooksAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataHome: action.payload.data.data,
        // pagination: action.payload.data.pagination,
      };

    case postBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case postBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case postBookAction + fulfilled:
      prevState.data.push(action.payload.data.data.data);

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: prevState.data,
      };

    case editBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case editBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        // errorToken: action.payload.response.data.data.message
      };
    case editBookAction + fulfilled:
      const newData = prevState.data.map(dataBook => {
        // eslint-disable-next-line eqeqeq
        if (dataBook.id == action.payload.data.data.data.id) {
          return action.payload.data.data.data;
        }
        return dataBook;
      });

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        // dataObj:action.payload.data.data[0],
        data: newData,
      };

    case deleteBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorDelete: action.error,
      };
    case deleteBookAction + fulfilled:
      const deleteData = prevState.data.filter(
        // eslint-disable-next-line eqeqeq
        dataBook => dataBook.id != parseInt(action.payload.data.data.id),
      );
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: deleteData,
      };

    case getDetailBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getDetailBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case getDetailBookAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataDetail: action.payload.data.data,
        //  title:action.payload.data.data[0].title,
        dataObj: action.payload.data.data[0],
        //  data: action.payload.data.data,
      };

    case getBookByIdAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBookByIdAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case getBookByIdAction:
      const bookById = prevState.data.filter(
        dataBook => dataBook.id === action.payload,
      );
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        // title: action.payload.data.data.title,
        dataById: bookById,

        //  data: action.payload.data.data,
      };
    case getBookByGenreOnIdAction:
      const bookByGenre = prevState.dataByGenre.filter(
        dataBook => dataBook.id === action.payload,
      );
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        // title: action.payload.data.data.title,
        dataById: bookByGenre,
        //  data: action.payload.data.data,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default dataBook;
