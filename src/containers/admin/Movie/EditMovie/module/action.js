import movieApi from "apis/movieApi";
import { GET_MOVIE_INFO_FAIL, GET_MOVIE_INFO_REQUEST, GET_MOVIE_INFO_SUCCESS, UPDATE_LOADER_2 } from "./type";

const actGetMovieInfoRequest =()=>({
    type: GET_MOVIE_INFO_REQUEST
})
const actGetMovieInfoSuccess = (movie) => ({
    type: GET_MOVIE_INFO_SUCCESS,
    payload: movie,
})
const actGetMovieInfoFail = (error) =>({
    type: GET_MOVIE_INFO_FAIL,
    payload: error,
})

export const actGetMovieInfo = (movieId) =>{
    return dispatch => {
        dispatch(actGetMovieInfoRequest());
        movieApi.getMovieInfoApi(movieId).then(res => {
            dispatch(actGetMovieInfoSuccess(res.data))
        })
        .catch(err=>{
            dispatch(actGetMovieInfoFail("Can not get movie Info"))
        })
    }
}

export const actUpdateMovie = (formData,token) =>{
    return dispatch => {
        movieApi.updateMovie(formData,token).then(res=>{
            console.log("thành công:", res)
        })
        .catch(error=>{
            console.log("lỗi:",error)
        })
    }
}