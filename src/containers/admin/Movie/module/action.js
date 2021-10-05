import movieApi from "apis/movieApi";
import theaterApi from "apis/theaterApi";
import { ADD_MOVIE_FAIL, ADD_MOVIE_SUCCESS, GET_MOVIE_INFO_FAIL, GET_MOVIE_INFO_REQUEST, GET_MOVIE_INFO_SUCCESS, GET_MOVIE_LIST_FAIL, GET_MOVIE_LIST_REQUEST, GET_MOVIE_LIST_SUCCESS, GET_SHOWTIME_FAIL, GET_SHOWTIME_REQUEST, GET_SHOWTIME_SUCCESS } from "./type";

//GET MOVIE LIST
const actGetMovieListRequest = () => ({
    type: GET_MOVIE_LIST_REQUEST
})
const actGetMovieListSuccess = (movieList) => ({
    type: GET_MOVIE_LIST_SUCCESS,
    payload: movieList,
})
const actGetMovieListFail = (error) => ({
    type: GET_MOVIE_LIST_FAIL,
    payload: error,
})


export const actGetMovieList = (movieName) => {
    return dispatch => {
        dispatch(actGetMovieListRequest());
        movieApi.getListMovieApi(movieName)
            .then(res => {
                dispatch(actGetMovieListSuccess(res.data))
            })
            .catch(err => {
                dispatch(actGetMovieListFail("Can not get movie list"))
            })
    }
}

//ADD MOVIE
const actAddMovieSuccess = (movie) => ({
    type: ADD_MOVIE_SUCCESS,
    payload: movie,
})
const actAddMovieFail = (error) => ({
    type: ADD_MOVIE_FAIL,
    payload: error,
})

export const actAddMovie = (formData) => {
    return dispatch => {
        movieApi.addMovieApi(formData)
        .then(res => { 
            dispatch(actAddMovieSuccess(res)) 
        })
        .catch(error => {
            dispatch(actAddMovieFail("Can not add movie"))
        })
    }
}
//DELETE MOVIE

export const actDeleteMovie = (movieId,token) =>{
    return dispatch => {
        movieApi.deleteMovieApi(movieId,token)
        .then(res => { 
            console.log("Delete Success")
        })
        .catch(err => {
            console.log("Delete Fail")
        })
    }
}
// GET SHOW TIME

const actGetShowtimeRequest = ()=>({
    type:GET_SHOWTIME_REQUEST
})

const actGetShowtimeSuccess = (showtime) => ({
    type:GET_SHOWTIME_SUCCESS,
    payload: showtime,
})
const actGetShowtimeFail = (error) => ({
    type:GET_SHOWTIME_FAIL,
    payload: error
})

export const actGetShowtime = (movieId) =>{
    return dispatch => {
        dispatch(actGetShowtimeRequest());
        theaterApi.getShowtime(movieId)
        .then(res => {
            dispatch(actGetShowtimeSuccess(res.data));
        })
        .catch(err => {
            dispatch(actGetShowtimeFail("Can not get show time"));
        })
    }
}


