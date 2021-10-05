import theaterApi from "apis/theaterApi";
import userApi from "apis/userApi";
import { CLEAR_USER_INFOR, GET_USER_INFOR_FAIL, GET_USER_INFOR_REQUEST, GET_USER_INFOR_SUCCESS, LAY_DANH_SACH_RAP, UPDATE_USER_INFO_FAIL, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "./type";

const actGetUserInfoRequest = () => ({
    type: GET_USER_INFOR_REQUEST
})
const actGetUserInfoSuccess = (userInfo) => ({
    type: GET_USER_INFOR_SUCCESS,
    payload: userInfo,
})
const actGetUserInfoFail = error => ({
    type: GET_USER_INFOR_FAIL,
    payload: error,
})
const actUpdateUserInfoRequest = () => ({
    type: UPDATE_USER_INFO_REQUEST
})
const actUpdateUserInfoSuccess = (userInfo) => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: userInfo,
})
const actUpdateUserInfoFail = error => ({
    type: UPDATE_USER_INFO_FAIL,
    payload: error,
})
export const actGetUser = (username) => {
    return dispatch => {
        dispatch(actGetUserInfoRequest());
        userApi.getUserInfoApi(username)
        .then(respone => {
            dispatch(actGetUserInfoSuccess(respone.data));
        })
        .catch(err => {
            dispatch(actGetUserInfoFail('Unable To Get User!'))
        })
    }
}
export const actClearUserInfo = () =>({
    type:CLEAR_USER_INFOR,
    payload: null,
})

export const actUpdateUserInfo = (userInfo,token) => {
    return dispatch => {
        dispatch (actUpdateUserInfoRequest());
        userApi.updateUserInfoApi(userInfo,token)
        .then(respone =>{
            dispatch(actUpdateUserInfoSuccess(respone.data));
        })
        .catch(err => {
            dispatch(actUpdateUserInfoFail('Unable To Update User!'));
        })

    }
}

const actLayDanhSachRapSuccess = (danhSachRap) => ({
    type:LAY_DANH_SACH_RAP,
    payload:danhSachRap
})
export const actLayDanhSachRap = ()=>{
    return dispatch => {
        theaterApi.getTheaterList().then(respone =>{
            dispatch(actLayDanhSachRapSuccess(respone.data))
        }).catch(error=>{
            console.log(error)
        })
    }
}