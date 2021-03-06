import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import moment from 'moment'

import * as ActionTypes from '../actions'
import entities from './entities'
import feed from './feed'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, payload } = action
  
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return payload || null
  } else if (!error && payload && payload.message) {
    return payload || null
  }
  
  return state
}

function auth(state = {user: null}, action) {
  const {type, payload} = action
  
  switch (type) {
    case ActionTypes.USER_LOGIN_SUCCESS: {
      return {...state, user: payload.user}
    }
    /*case ActionTypes.USER_REGISTER_SUCCESS: {
      return {...state, user: payload.user.id}
    }*/
    case ActionTypes.USER_LOGOUT_SUCCESS: {
      return {...state, user: null}
    }
    default: {
      return state
    }
  }
}

function hashes(state = {}, action) {
  return state
}

export function meta(state = {}, action) {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.META_ALERT_BAR_HIDE: {
      return {...state, showAlertBar: false}
    }
    case ActionTypes.META_ALERT_BAR_SHOW: {
      return {...state, showAlertBar: true}
    }
    case ActionTypes.META_SEARCH_BAR_HIDE: {
      return {...state, showSearchBar: false}
    }
    case ActionTypes.META_SEARCH_BAR_SHOW: {
      return {...state, showSearchBar: true}
    }
    case ActionTypes.META_LOGO_LINK_SET: {
      return {...state, logoLink: payload}
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  auth,
  meta,
  entities,
    feed,
  form: formReducer,
  errorMessage,
  hashes,
  routing,
})

export default rootReducer
