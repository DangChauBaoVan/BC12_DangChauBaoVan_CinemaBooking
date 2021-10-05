import { FETCH_ALL_MOVIE } from "./type";

const initialState = {
    listMovie: [],
    loading: true
}

const movieListReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_ALL_MOVIE:
        return { ...state, listMovie: payload, loading: false}

    default:
        return state
    }
}

export default movieListReducer;