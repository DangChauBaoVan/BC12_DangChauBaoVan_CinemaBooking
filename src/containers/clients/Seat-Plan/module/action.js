import bookingTicket from "apis/bookingTicket";
import { connection } from "index";
import { DANH_SACH_GHE_DANG_CHON, DAT_GHE, DAT_VE_THANH_CONG, DAT_VE_THAT_BAI, GET_ROOM_TICKET_FAIL, GET_ROOM_TICKET_REQUEST, GET_ROOM_TICKET_SUCCESS, HIDE_LOADING, SHOW_LOADING } from "./type";

const actGetRoomTicketRequest = () => ({
    type: GET_ROOM_TICKET_REQUEST
})
const actGetRoomTicketSuccess = (roomTicket) => ({
    type: GET_ROOM_TICKET_SUCCESS,
    payload: roomTicket,
})
const actGetRoomTicketFail = error => ({
    type: GET_ROOM_TICKET_FAIL,
    payload: error,
})

export const actGetRoomTicket = (maLichChieu) => {
    return dispatch => {
        dispatch(actGetRoomTicketRequest());
        bookingTicket.getRoomTicketApi(maLichChieu)
        .then(respone => {
            dispatch(actGetRoomTicketSuccess(respone.data));
        })
        .catch(err => {
            dispatch(actGetRoomTicketFail('Unable To Get Lich Chieu!'))
        })
    }
}
export const actDanhSachGheDangChon = (gheDangChon) =>({
    type: DANH_SACH_GHE_DANG_CHON,
    payload:gheDangChon
})
//ĐẶT GHẾ REALTIME
// export const actDatGhe = (ghe,maLichChieu) => {
//     return async (dispatch,getState) => {
//         await dispatch(actDanhSachGheDangChon(ghe))
//         let danhSachGheDangDat = getState().bookTicketReducer.danhSachGheDangDat;
//         let curentUser = getState().authReducer.curentUser
//         console.log("DSGĐ: ",danhSachGheDangDat)
//         console.log("TK: ",curentUser.taiKhoan)
//         console.log("MLC:",maLichChieu)

//         danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

//         connection.invoke('datGhe',curentUser.taiKhoan,danhSachGheDangDat,maLichChieu)
//     }
// }

export const actDanhSachGheKD = (arrGheKhachDat)=>({
    type:DAT_GHE,
    payload:arrGheKhachDat
})

//ĐẶT VÉ

const actDatVeThanhCong = (success) => ({
    type: DAT_VE_THANH_CONG,
    payload:success
})
const actDatVeThatBai = (error) => ({
    type: DAT_VE_THAT_BAI,
    payload:error
})
export const actDatVe =(thongTinDatVe,token,maLichChieu) =>{
    return async (dispatch,getState)  => {
        try{
            await dispatch(actShowLoading())
            const result = await bookingTicket.bookTicketApi(thongTinDatVe,token)
            console.log(result.data)

            await dispatch(actDatVeThanhCong(result.data))
            await dispatch(actGetRoomTicket(maLichChieu))
            dispatch(actHideLoading())
            //Realtime chọn ghế
            // let curentUser = getState().authReducer.curentUser
            // connection.invoke('datGheThanhCong',curentUser.taiKhoan,thongTinDatVe,maLichChieu)

            
        }
        catch(error){
            dispatch(actDatVeThatBai(error))
            dispatch(actHideLoading())
            
        }
    }
    // return dispatch => {
    //     dispatch(actShowLoading())
    //     bookingTicket.bookTicketApi(thongTinDatVe,token)
    //     .then(res => {
            
    //         dispatch(actDatVeThanhCong(res))
    //         dispatch(actHideLoading())
    //         dispatch(actGetRoomTicket(maLichChieu))
    //     })
    //     .catch(error => {
            
    //         dispatch(actDatVeThatBai(error))
    //         dispatch(actHideLoading())
    //     })
    // }
}

//LOADING

export const actShowLoading = () => ({
    type: SHOW_LOADING,
})
export const actHideLoading = () => ({
    type: HIDE_LOADING,
})