import { FETCH_MOVIE_DETAIL } from "./types";

export const actFetchMovieDetail = movieDetail =>({
    type: FETCH_MOVIE_DETAIL,
    payload: movieDetail,
})