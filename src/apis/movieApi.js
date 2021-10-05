import callApi from "utils/callAPI";

import { GROUP_ID } from 'setting/apiConfig';

const movieApi = {
    getListMovieApi(movieName=""){
        if(movieName!==""){
            return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${movieName}`)
        }
        return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    },
    addMovieApi(formData){
        return callApi(`QuanLyPhim/ThemPhimUploadHinh`,"POST",formData)
    },
    getMovieInfoApi(movieId){
        return callApi(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
    },
    updateMovie(formData,token){
        return callApi(`QuanLyPhim/CapNhatPhimUpload`,"POST",formData,token)
    },
    deleteMovieApi(movieId,token){
        return callApi(`QuanLyPhim/XoaPhim?MaPhim=${movieId}`,"DELETE",null,token)
    },
    fetchAllMovieApi(){
        return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    },
    fetchMovieDetailApi(movieId){
        return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
    }
}

export default movieApi;