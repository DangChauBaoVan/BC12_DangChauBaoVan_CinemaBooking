import { FETCH_MOVIE_DETAIL } from "./type";

export const actFetchMovieDetail = movieDetail =>({
    type: FETCH_MOVIE_DETAIL,
    payload: movieDetail,
})