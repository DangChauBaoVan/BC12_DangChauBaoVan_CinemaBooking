import { DANH_SACH_GHE_DANG_CHON, DAT_GHE, DAT_VE_THANH_CONG, DAT_VE_THAT_BAI, GET_ROOM_TICKET_FAIL, GET_ROOM_TICKET_REQUEST, GET_ROOM_TICKET_SUCCESS, HIDE_LOADING, SHOW_LOADING } from "./type"

const initialState = {
    roomTicket:{},
    loading: false,
    error: null,
    danhSachGheDangDat: [],
    danhSachGheKhachDat:[],
    loadingDatVe:false,
    ketQuaDatVe:null
}

const bookTicketReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_ROOM_TICKET_REQUEST:
        return { ...state, loading:true, error:null,ketQuaDatVe:null }
    case GET_ROOM_TICKET_SUCCESS:
        return { ...state, loading:false, roomTicket: payload}
    case GET_ROOM_TICKET_FAIL:
        return { ...state, loading:false, error:payload}
    case DANH_SACH_GHE_DANG_CHON:
        let danhSachGheCapNhat = [...state.danhSachGheDangDat];
        let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === payload.maGhe)
        if(index != -1) {
            danhSachGheCapNhat.splice(index,1)
            console.log(danhSachGheCapNhat)

        }else{
            danhSachGheCapNhat.push(payload)
        }
        return { ...state, danhSachGheDangDat: danhSachGheCapNhat}
    case DAT_VE_THANH_CONG:
        return { ...state,ketQuaDatVe:payload,danhSachGheDangDat:[] }
    case DAT_VE_THAT_BAI:
        return { ...state,error: payload}
    case SHOW_LOADING:
        return { ...state,loadingDatVe:true}
    case HIDE_LOADING:
        return { ...state,loadingDatVe:false}
    case DAT_GHE:
        return {...state,danhSachGheKhachDat:payload}
    default:
        return state
    }
}

export default bookTicketReducer
