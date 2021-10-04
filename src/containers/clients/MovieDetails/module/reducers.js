const { FETCH_MOVIE_DETAIL } = require("./types")

const initialState = {
    movieDetail: {},
    loading: true,
}

const movieDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_MOVIE_DETAIL:
        return { ...state, movieDetail: payload, loading: false}

    default:
        return state
    }
}

export default movieDetailReducer;