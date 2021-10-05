import callApi from "utils/callAPI";

import { GROUP_ID } from 'setting/apiConfig';

const theaterApi = {
    getTheaterList(){
        return callApi(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    },
    getTheaterInfo(){
        return callApi(`QuanLyRap/LayThongTinHeThongRap`)
    },
    getGroupTheaterInfo(theaterId){
        return callApi(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterId}`)
    },
    createShowtime(showtime,token){
        return callApi(`QuanLyDatVe/TaoLichChieu`,"POST",showtime,token)
    },
    getShowtime(movieId){
        return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
    }
    
}
export default theaterApi