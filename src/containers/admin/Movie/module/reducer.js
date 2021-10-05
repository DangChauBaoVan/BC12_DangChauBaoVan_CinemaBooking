import { ADD_MOVIE_FAIL, ADD_MOVIE_SUCCESS, GET_MOVIE_LIST_FAIL, GET_MOVIE_LIST_REQUEST, GET_MOVIE_LIST_SUCCESS, GET_SHOWTIME_FAIL, GET_SHOWTIME_REQUEST, GET_SHOWTIME_SUCCESS } from "./type"


const initialState = {
    listMovie:[],
    loading:false,
    error:null,
    movie:null,
    showtime:{},
}

const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_MOVIE_LIST_REQUEST:
        return { ...state, loading: true, error: null}
    case GET_MOVIE_LIST_SUCCESS:
        return { ...state, loading: false, listMovie: payload}
    case GET_MOVIE_LIST_FAIL:
        return { ...state, error: payload, loading: false}
    case ADD_MOVIE_SUCCESS:
        return { ...state, movie: payload}
    case ADD_MOVIE_FAIL:
        return { ...state,error: payload}
    case GET_SHOWTIME_REQUEST:
        return { ...state, loading:true, error: null}
    case GET_SHOWTIME_SUCCESS:
        return { ...state, showtime:payload, loading: false}
    case GET_SHOWTIME_FAIL:
        return { ...state, error: payload, loading: false}
    default:
        return state
    }
}
export default movieReducer;
