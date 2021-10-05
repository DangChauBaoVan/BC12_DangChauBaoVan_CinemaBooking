import callApi from "utils/callAPI";

import { GROUP_ID } from 'setting/apiConfig';

const bookingTicket = {
    getRoomTicketApi(maLichChieu){
        
        return callApi(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    },
    bookTicketApi(thongTinDatVe,token){
        return callApi(`QuanLyDatVe/DatVe`,"POST",thongTinDatVe,token)
    }
}

export default bookingTicket;