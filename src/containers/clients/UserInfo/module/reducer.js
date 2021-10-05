import { CLEAR_USER_INFOR, GET_USER_INFOR_FAIL, GET_USER_INFOR_REQUEST, GET_USER_INFOR_SUCCESS, LAY_DANH_SACH_RAP, UPDATE_USER_INFO_FAIL, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "./type"

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
    dsHeThongRap:[]
    
}

const userInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_INFOR_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_USER_INFOR_SUCCESS:
            return { ...state, loading: false, userInfo: payload }
        case GET_USER_INFOR_FAIL:
            return { ...state, loading: false, error: payload }
        case CLEAR_USER_INFOR:
            return { ...state, loading: true, userInfo: payload }
        case UPDATE_USER_INFO_REQUEST:
            return { ...state, error: null}
        case UPDATE_USER_INFO_SUCCESS:
            return { ...state, userInfo: payload}
        case UPDATE_USER_INFO_FAIL:
            return { ...state, error: payload }
        case LAY_DANH_SACH_RAP:
            return { ...state, dsHeThongRap:payload}
        default:
            return state
    }
}

export default userInfoReducer
