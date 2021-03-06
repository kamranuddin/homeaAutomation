// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

function callApiLogin(email, password, rememberMe) {
  console.log("Email \n"+email+"\n Passowrd \n"+password+"\n remember \n"+rememberMe )
  return {
    [CALL_API]: {
      types: [
        USER_LOGIN,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE
      ],
      endpoint: `/api/user/login`,
      method: 'POST'
    },
    payload: {email, password, rememberMe}
  }
}

export function login(email, password, rememberMe) {
  return (dispatch, getState) =>
    dispatch(callApiLogin(email, password, rememberMe))
       /* .then((response) => dispatch(push(
            '/adminDashboard'
        )));*/

}

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

function callApiLogout() {
  return {
    [CALL_API]: {
      types: [
        USER_LOGOUT,
        USER_LOGOUT_SUCCESS,
        USER_LOGOUT_FAILURE
      ],
     endpoint: `/api/user/logout`,
      method: 'GET'
    }
  }
}

export function logout() {
  return (dispatch, getState) =>
    dispatch(callApiLogout())
      .then(() => dispatch(push('/login')))
}

export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export function register(firstName, lastName, email, password,accountId) {
  console.log("firstName \n"+firstName+"\n LastName \n"+lastName+"\n Email \n"+email+"\n Password \n"+password)
  return {
    [CALL_API]: {
      types: [
        USER_REGISTER,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAILURE
      ],
     endpoint: `/api/user/create`,
      method: 'POST'
    },
    payload: {firstName, lastName, email, password,accountId}
  }
}


export const USER_DELETE = 'USER_DELETE'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE'

export function deleteUser(email) {
    console.log(" Email \n"+email)
    return {
        [CALL_API]: {
            types: [
                USER_DELETE,
                USER_DELETE_SUCCESS,
                USER_DELETE_FAILURE
            ],
          /*  endpoint: `/api/users/deleteUser,*/
            method: 'POST'
        },
        payload: {email}
    }
}


export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD'
export const USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS'
export const USER_FORGOT_PASSWORD_FAILURE = 'USER_FORGOT_PASSWORD_FAILURE'

export function forgotPassword(email) {
  return {
    [CALL_API]: {
      types: [
        USER_FORGOT_PASSWORD,
        USER_FORGOT_PASSWORD_SUCCESS,
        USER_FORGOT_PASSWORD_FAILURE
      ],
    /*  endpoint: `/api/users/forgot-password`,*/
      method: 'POST'
    },
    payload: {email}
  }
}

export const USER_CONFIRM_REGISTRATION = 'USER_CONFIRM_REGISTRATION'
export const USER_CONFIRM_REGISTRATION_SUCCESS = 'USER_CONFIRM_REGISTRATION_SUCCESS'
export const USER_CONFIRM_REGISTRATION_FAILURE = 'USER_CONFIRM_REGISTRATION_FAILURE'

export function confirmRegistration(token) {
  return {
    [CALL_API]: {
      types: [
        USER_CONFIRM_REGISTRATION,
        USER_CONFIRM_REGISTRATION_SUCCESS,
        USER_CONFIRM_REGISTRATION_FAILURE
      ],
   /*   endpoint: `/api/users/verify-account?token=${token}`,*/
      method: 'POST'
    },
    payload: {token}
  }
}

export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD'
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS'
export const USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE'

export function resetPassword(token, password, confirmPassword) {
  return {
    [CALL_API]: {
      types: [
        USER_RESET_PASSWORD,
        USER_RESET_PASSWORD_SUCCESS,
        USER_RESET_PASSWORD_FAILURE
      ],
    /*  endpoint: `/api/users/reset-password?token=${token}`,*/
      method: 'POST'
    },
    payload: {token, password, confirmPassword}
  }
}

export const USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD'
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS'
export const USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE'

export function changePassword(currentPassword, newPassword, confirmNewPassword) {
  return {
    [CALL_API]: {
      types: [
        USER_CHANGE_PASSWORD,
        USER_CHANGE_PASSWORD_SUCCESS,
        USER_CHANGE_PASSWORD_FAILURE
      ],
  /*    endpoint: `/api/users/change-password`,*/
      method: 'POST'
    },
    payload: {currentPassword, newPassword, confirmNewPassword}
  }
}

export const USER_SEARCH_BY_EMAIL = 'USER_SEARCH_BY_EMAIL'
export const USER_SEARCH_BY_EMAIL_SUCCESS = 'USER_SEARCH_BY_EMAIL_SUCCESS'
export const USER_SEARCH_BY_EMAIL_FAILURE = 'USER_SEARCH_BY_EMAIL_FAILURE'

export function searchUsersByEmail(searchString) {
  return {
    [CALL_API]: {
      types: [
        USER_SEARCH_BY_EMAIL,
        USER_SEARCH_BY_EMAIL_SUCCESS,
        USER_SEARCH_BY_EMAIL_FAILURE
      ],
     /* endpoint: `/api/users/search-by-email?search=${searchString}`*/
    }
  }
}

export const USER_SEARCH_BY_NAME = 'USER_SEARCH_BY_NAME'
export const USER_SEARCH_BY_NAME_SUCCESS = 'USER_SEARCH_BY_NAME_SUCCESS'
export const USER_SEARCH_BY_NAME_FAILURE = 'USER_SEARCH_BY_NAME_FAILURE'

export function searchUsersByName(searchString) {
  return {
    [CALL_API]: {
      types: [
        USER_SEARCH_BY_NAME,
        USER_SEARCH_BY_NAME_SUCCESS,
        USER_SEARCH_BY_NAME_FAILURE
      ],
  /*    endpoint: `/api/users/search-by-name?search=${searchString}`*/
    }
  }
}

export const CHECK_TOKEN_RESET = 'CHECK_TOKEN_RESET'
export const CHECK_TOKEN_RESET_SUCCESS = 'CHECK_TOKEN_RESET_SUCCESS'
export const CHECK_TOKEN_RESET_FAILURE = 'CHECK_TOKEN_RESET_FAILURE'

export function isValidResetToken(tokenString) {
  return {
    [CALL_API]: {
      types: [
        CHECK_TOKEN_RESET,
        CHECK_TOKEN_RESET_SUCCESS,
        CHECK_TOKEN_RESET_FAILURE
      ],
   /*   endpoint: `/api/users/search-user-token?search=${tokenString}`,*/
      method: 'POST'
    },
    payload: {tokenString}
  }
}

export const USER_RESEND_ACTIVATION = 'USER_RESEND_ACTIVATION'
export const USER_RESEND_ACTIVATION_SUCCESS = 'USER_RESEND_ACTIVATION_SUCCESS'
export const USER_RESEND_ACTIVATION_FAILURE = 'USER_RESEND_ACTIVATION_FAILURE'

export function resendActivation(userId) {
  return {
    [CALL_API]: {
      types: [
        USER_RESEND_ACTIVATION,
        USER_RESEND_ACTIVATION_SUCCESS,
        USER_RESEND_ACTIVATION_FAILURE
      ],
     /* endpoint: `/api/users/resend-activation?id=${userId}`,*/
      method: 'POST'
    },
    payload: {userId}
  }
}