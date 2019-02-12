import * as types from '../actionTypes/session';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';
import urls from '../urls';
import history from '../history';

const sessionPersistConfig = {
  key: 'session',
  storage: storage,
  whitelist: ['authenticated']
}

function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.SIGN_IN_BEGIN:
      return {
        ...state,
        authenticated: false,
        loading: true,
      };
    case types.SIGN_IN_SUCCESS:
      history.push(urls.dictioanries);

      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        authenticated: false,
        loading: false,
      };
    case types.SIGN_OUT_BEGIN:
      return {
        ...state,
        authenticated: true,
        loading: true,
      };
    case types.SIGN_OUT_SUCCESS:
      history.push(urls.root);

      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case types.FREE_SESSION_ERRORS:
      return {
        ...state,
        errors: undefined,
      };
    case types.AUTHENTICATION_CHECK_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case types.AUTHENTICATION_CHECK_END:
      return {
        ...state,
        authenticated: action.status,
        loading: false,
      }
    default:
      return state;
  }
}

export default persistReducer(sessionPersistConfig, sessionReducer);