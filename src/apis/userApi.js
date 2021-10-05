import callApi from "utils/callAPI";

import { GROUP_ID } from 'setting/apiConfig';


const userApi = {
    loginApi(user){
        return callApi('QuanLyNguoiDung/DangNhap','POST',user);
    },
    fetchAllUserApi(){
        return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
    },
    registerApi(account){
        return callApi('QuanLyNguoiDung/DangKy','POST',account);
    },
    getUserInfoApi(username){
        return callApi(`QuanLyNguoiDung/ThongTinTaiKhoan`,'POST',username);
    },
    updateUserInfoApi(userInfo,token){
        return callApi(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,'PUT',userInfo,token)
    },
    
}

export default userApi;