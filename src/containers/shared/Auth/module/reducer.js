import { FETCH_ALL_USER_FAIL, FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./type"

const initialState = {
    curentUser: null,
    loading: false,
    error: null,
    listUser: [],
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, curentUser: payload }
        case LOGIN_FAIL:
            return { ...state, loading: false, error: payload }
        case LOGOUT:
            return { ...state, curentUser: payload };
        case FETCH_ALL_USER_REQUEST:
            return { ...state, error: null }
        case FETCH_ALL_USER_SUCCESS:
            return { ...state,  listUser: payload }
        case FETCH_ALL_USER_FAIL:
            return { ...state, error: payload }
        case REGISTER_REQUEST:
            return { ...state, error: null }
        case REGISTER_SUCCESS:
            return { ...state,curentUser: payload }
        case REGISTER_FAIL:
            return { ...state, error:payload}
        default:
            return state
    }
}

export default authReducer
