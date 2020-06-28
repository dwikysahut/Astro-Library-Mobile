/* eslint-disable no-shadow */
/* eslint-disable radix */
// berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
import {
  getUserAction,
  pending,
  rejected,
  fulfilled,
  loginUserAction,
  registerUserAction,
  deleteUserAction,
  logoutUserAction,
  refreshTokenAction,
  putUserAction,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

const initialValue = {
  data: [],

  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  errorToken: '',
  error: '',
  errorDelete: '',
  role: '',
  id: '',
  email: '',
  refreshtoken: '',
  token: '',
  dataLogin: {},
  id_user: '',
}; // biar tidak undefined

const dataUser = (prevState = initialValue, action) => {
  switch (action.type) {
    case getUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case getUserAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: action.payload.data.data,
      };

    case deleteUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorDelete: action.error,
      };
    case deleteUserAction + fulfilled:
      const deleteData = prevState.data.filter(
        // eslint-disable-next-line eqeqeq
        dataUser => dataUser.id != parseInt(action.payload.data.data.id),
      );
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: deleteData,
      };
    case putUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case putUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data,
      };
    case putUserAction + fulfilled:
      const newData = prevState.data.map(dataUser => {
        // eslint-disable-next-line eqeqeq
        if (dataUser.id == action.payload.data.data.id) {
          return action.payload.data.data;
        }
        return dataUser;
      });

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: newData,
      };

    case registerUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case registerUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.meessage,
        error: action.payload.response.status,
      };
    case registerUserAction + fulfilled:
      prevState.data.push(action.payload.data.data);

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: prevState.data,
        errorToken: '',
        error: '',
      };

    case loginUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        error: '',
      };
    case loginUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
        token: action.payload,
      };
    case loginUserAction + fulfilled:
      // eslint-disable-next-line eqeqeq
      if (action.payload.status == 204) {
        return {
          // isRejected: true,
          error: action.payload.status,
        };
      } else {
        return {
          ...prevState,
          isLoading: false,
          isRejected: false,
          isFulfilled: true,
          data: prevState.data,
          dataLogin: action.payload.data.data,
          token: action.payload.data.data.token,
          role: action.payload.data.data.role,
          id_user: action.payload.data.data.id,
          email: action.payload.data.data.email,
          id: action.payload.data.data.id,
          refreshtoken: action.payload.data.data.refreshToken,
        };
      }

    case logoutUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case logoutUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case logoutUserAction + fulfilled:
      // eslint-disable-next-line no-unused-vars
      const clear = async value => {
        try {
          await AsyncStorage.clear();
        } catch (e) {
          // saving error
        }
        clear();
      };
      // prevState.data.push(action.payload.data.data)

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: prevState.data,
        dataLogout: action.payload.data.data,
        error: action.payload.status,
      };

    case refreshTokenAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case refreshTokenAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case refreshTokenAction + fulfilled:
      //   localStorage.removeItem('token');
      //   localStorage.setItem('token', action.payload.data.data.token);

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        // data: prevState.data,
        dataToken: action.payload.data.data,
        token: action.payload.data.data.token,
        refreshtoken: action.payload.data.data.refreshToken,
        // error:action.payload.status
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default dataUser;
