import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
import { actDanhSachGheDangChon, actDanhSachGheKD, actDatGhe, actDatVe, actGetRoomTicket } from "./module/action";
import { StopOutlined,UserOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./SeatPlan.scss";
import _ from "lodash";
import Loading from "components/Loading/Loading";
import { connection } from "index";

class SeatPlan extends Component {
  handleDatVe = () => {
    const {danhSachGheDangDat,curentUser } = this.props;
    const MySwal = withReactContent(Swal);
    if(danhSachGheDangDat.length === 0){
      MySwal.fire({
        title: "Không thể đặt vé",
        type: "error",
        icon: "error",
        text: "Bạn chưa chọn ghế!",
        confirmButtonColor: "#de6262",
      });
    }else{
      let thongTinDatVe = {
        maLichChieu:this.props.match.params.showTimeId,
        danhSachVe:danhSachGheDangDat,
        taiKhoanNguoiDung:curentUser.taiKhoan
      }
      this.props.datVe(thongTinDatVe,curentUser.accessToken,thongTinDatVe.maLichChieu)
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Đặt vé thành công',
        animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      this.props.history.push("/");
    }
    
  }
  renderSeat = () => {
    const { roomTicket, danhSachGheDangDat,danhSachGheKhachDat } = this.props;
    return roomTicket.danhSachGhe?.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let gheKhachDangChon ='';
      let indexGheKhachDangChon = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
      if(indexGheKhachDangChon !== -1){
        gheKhachDangChon="gheKhachChon"
      }

      let gheDangDat ="";
      let indexGheDangDat = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      if(indexGheDangDat!=-1){
          gheDangDat = 'gheDangDat'
      }
      return (
        <>
          <button
            onClick={() => {
                this.props.chonDanhSachGhe(ghe)
            }}
            disabled={ghe.daDat || gheKhachDangChon !== "" }
            key={index}
            className={`ghe ${gheVip}  ${gheDaDat} ${gheDangDat} ${gheKhachDangChon}`}
          >
            {ghe.daDat ? (
              <StopOutlined style={{ fontSize: "16px", marginBottom: "2px",textAlign: "justify"}} />
            ) : (
              gheKhachDangChon !== ""? <UserOutlined  style={{ fontSize: "16px", marginBottom: "2px",textAlign: "justify"}}/> : ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </>
      );
    });
  };
  render() {
    const { loading, roomTicket, curentUser,danhSachGheDangDat } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="container-fluid  seatPlan" style={{ minHeight: "100vh" }}>
    <Loading/>

        <div className="row">
          <div className="col-9">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
              <div
                style={{
                  width: "90%",
                  backgroundColor: "black",
                  height: "15px",
                }}
              ></div>
              <div className="trapezoid text-center">
                <p>Màn hình</p>
              </div>
              <div className="mt-4">{this.renderSeat()}</div>
              <div>
                <table className="table table-borderless w-100">
                  <thead>
                    <tr>
                      <th>Ghế chưa đặt</th>
                      <th>Ghế đang đặt</th>
                      <th>Ghế đã đặt</th>
                      <th>Ghế vip</th>
                      <th>Ghế người khác đang đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <button class="ghe text-center">0</button>
                      </td>
                      <td>
                        <button class="ghe gheDangDat text-center">0</button>
                      </td>
                      <td>
                        <button class="ghe gheDaDat text-center">0</button>
                      </td>
                      <td>
                        <button class="ghe gheVip text-center">0</button>
                      </td>
                      <td>
                        <button class="ghe gheKhachChon text-center">0</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3 h-100 text-left contentRight" style={{fontSize: "20px",height: "100vh"}}>
            <h3 className="text-center text-2xl text-success">{danhSachGheDangDat?.reduce((tongTien,ghe,index)=>{
                        return tongTien += ghe.giaVe
                    },0).toLocaleString()} Đ</h3>
            <hr />
            <h3 className="text-xl text-center text-uppercase">{roomTicket.thongTinPhim?.tenPhim}</h3>
            <p className="text-uppercase" style={{fontSize: "15px"}}>
              {roomTicket.thongTinPhim?.tenCumRap} -{" "}
              {roomTicket.thongTinPhim?.tenRap}
            </p>
            <p className="text-uppercase" style={{fontSize: "15px"}}>
              {roomTicket.thongTinPhim?.ngayChieu} -{" "}
              {roomTicket.thongTinPhim?.gioChieu}
            </p>
            <hr />
            <div className="row my-4 ">
              <div className="col-6 text-justify">
                <span style={{ color: "orange",fontSize: "20px" }}>
                    Ghế:
                    {_.sortBy(danhSachGheDangDat,['stt']).map((gheDD,index) => {
                        return <span key={index} className="text-success" style={{fontSize: "20px"}}> { gheDD.stt}</span>
                    })}
                </span>
              </div>
              <div className="col-6 text-right">
                <span style={{fontSize: "20px"}} className="text-warning font-weight-bolder">
                    {danhSachGheDangDat?.reduce((tongTien,ghe,index)=>{
                        return tongTien += ghe.giaVe
                    },0).toLocaleString()} Đ
                </span>
              </div>
            </div>
            <hr />
            <div className="my-4" style={{fontSize: "15px"}}>
              <span>Email: {curentUser.email}</span>
            </div>
            <hr />
            <div className="my-4" style={{fontSize: "15px"}}>
              <span>Phone: {curentUser.soDT}</span>
            </div>
            <hr />
            <div
              className="mb-2 "
              style={{ height: "100%" }}
            >
              <div
                onClick={this.handleDatVe}
                className="text-white bg-success text-center py-2 w-100 font-weight-bolder datVe"
                style={{ fontSize: "20px", borderRadius: "5px" }}
              >
                ĐẶT VÉ
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  clearGhe = () => {
    connection.invoke('huyDat',this.props.curentUser.taiKhoan,this.props.match.params.showTimeId)
  }
  componentDidMount() {
    this.props.getRoomTicket(this.props.match.params.showTimeId);

    //ĐẶT GHẾ REALTIME ( GẶP LỖI KHI NGƯỜI DÙNG KHÁC CÙNG ĐĂNG NHẬP VÀ CHỌN GHẾ KHI RELOAD LẠI TRANG THÌ THÔNG TIN GHẾ ĐÓ VẪN CÒN)

    // connection.on('datVeThanhCong',()=>{
    //   this.props.getRoomTicket(this.props.match.params.showTimeId);
    // })
    // connection.invoke('loadDanhSachGhe',this.props.match.params.showTimeId)
    // connection.on("loadDanhSachGheDaDat",(dsGheKhachDat) => {
    //   console.log("dsGheKhachDat",dsGheKhachDat);

    //   dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== this.props.curentUser.taiKhoan)

    //   let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
    //     let arrGhe =JSON.parse(item.danhSachGhe);
    //     return [...result,...arrGhe]
    //   },[])

    //   arrGheKhachDat = _.uniqBy(arrGheKhachDat,"maGhe")

    //   console.log(arrGheKhachDat);

    //   this.props.dsGheKD(arrGheKhachDat);

    //   window.addEventListener("beforeunload", this.clearGhe);

    //   return () => {
    //     this.clearGhe();
    //     window.removeEventListener("beforeunload",this.clearGhe);
    //   }

    // })
  }
  
}

const mapStateToProps = (state) => ({
  roomTicket: state.bookTicketReducer.roomTicket,
  loading: state.bookTicketReducer.loading,
  error: state.bookTicketReducer.error,
  danhSachGheDangDat: state.bookTicketReducer.danhSachGheDangDat,
  curentUser: state.authReducer.curentUser,
  danhSachGheKhachDat: state.bookTicketReducer.danhSachGheKhachDat
});
const mapDispatchToProps = (dispatch) => ({
  getRoomTicket: (maLichChieu) => {
    dispatch(actGetRoomTicket(maLichChieu));
  },
  chonDanhSachGhe: (ghe) => {
      dispatch(actDanhSachGheDangChon(ghe));
  },
  datVe: (thongTinDatVe,token,maLichChieu) => {
    dispatch(actDatVe(thongTinDatVe,token,maLichChieu))
  },
  // datGhe: (ghe,maLichChieu) => {
  //   dispatch(actDatGhe(ghe,maLichChieu))
  // },
  // dsGheKD: (dsGheKD) =>{
  //   dispatch(actDanhSachGheKD(dsGheKD))
  // }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeatPlan));
