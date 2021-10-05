import userApi from 'apis/userApi'
import { FETCH_ALL_USER_FAIL, FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, } from './type'

const actLoginRequest = () => ({
    type: LOGIN_REQUEST,
})
const actLoginSuccess = (curentUser) => ({
    type: LOGIN_SUCCESS,
    payload:curentUser
})
const actLoginFail = (error) => ({
    type: LOGIN_FAIL,
    payload:error
})
const actFecthAllUserRequest = () => ({
    type: FETCH_ALL_USER_REQUEST,
})
const actFecthAllUserSuccess = (listUser) => ({
    type: FETCH_ALL_USER_SUCCESS,
    payload:listUser
})
const actFecthAllUserFail = (error) => ({
    type: FETCH_ALL_USER_FAIL,
    payload:error
})
const actRegisterRequest = () => ({
    type: REGISTER_REQUEST,
})
const actRegisterSuccess = (account)=>({
    type: REGISTER_SUCCESS,
    payload:account
})
const actRegisterFail = (error) => ({
    type: REGISTER_FAIL,
    payload: error
})


export const actLogin = (user) => {
    return dispatch => {
        dispatch(actLoginRequest());
        userApi.loginApi(user)
        .then(respone => {
            dispatch(actLoginSuccess(respone.data));
        })
        .catch(err => {
            dispatch(actLoginFail('Unable To Login'))
        })
    }
}

export const actLogOut = () =>({
    type:LOGOUT,
    payload: null,
})

export const actFecthAllUser = () => {
    return dispatch => {
        dispatch(actFecthAllUserRequest());
        userApi.fetchAllUserApi()
        .then(respone => {
            dispatch(actFecthAllUserSuccess(respone.data));
        })
        .catch(error => {
            dispatch(actFecthAllUserFail(error));
        })
    }
}
 export const actRegister = (account) =>{
     return dispatch => {
         dispatch(actRegisterRequest());
         userApi.registerApi(account)
         .then(respone => {
             dispatch(actRegisterSuccess(respone.data))
         })
         .catch(error => {
             dispatch(actRegisterFail(error))
         })

     }
 }