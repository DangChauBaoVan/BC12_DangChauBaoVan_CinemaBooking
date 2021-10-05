import { GET_MOVIE_INFO_FAIL, GET_MOVIE_INFO_REQUEST, GET_MOVIE_INFO_SUCCESS, UPDATE_LOADER_2} from "./type"


const initialState = {
    loading:false,
    error:null,
    movieInfo:{},
}

const editMovieReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_MOVIE_INFO_REQUEST:
        return { ...state,loading: true, error: null}
    case GET_MOVIE_INFO_SUCCESS:
        return { ...state, movieInfo: payload, loading: false}
    case GET_MOVIE_INFO_FAIL:
        return { ...state, error: payload, loading: false}
    default:
        return state
    }
}
export default editMovieReducer;
