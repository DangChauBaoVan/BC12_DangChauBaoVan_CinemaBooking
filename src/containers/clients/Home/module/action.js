import { FETCH_ALL_MOVIE } from "./type";

export const actFetchAllMovie = listMovie =>({
    type: FETCH_ALL_MOVIE,
    payload: listMovie,
});