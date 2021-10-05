import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Loader from "components/Loader/Loader";
import { actGetMovieInfo, actUpdateMovie } from "./module/action";

class EditMovie extends Component {
  state = {
    values: {
      maPhim: this.props.movieInfo.maPhim,
      tenPhim: this.props.movieInfo.tenPhim,
      trailer: this.props.movieInfo.trailer,
      hinhAnh: null,
      moTa: this.props.movieInfo.moTa,
      maNhom: "GP08",
      ngayKhoiChieu: moment(this.props.movieInfo.ngayKhoiChieu).format("YYYY-MM-DD"),
      danhGia: this.handleDanhGia(this.props.movieInfo.danhGia),
    },
    imgSrc: "",
  };
  handleDanhGia(number){
    if(number>=5){
      return 5
    }
    if(number <=0){
      return 1
    }
  }
  handleRender = () => {
    const { movieInfo } = this.props;
    this.setState({
      values: {
        ...this.state.values,
        maPhim: movieInfo?.maPhim,
        tenPhim: movieInfo?.tenPhim,
        trailer: movieInfo?.trailer,
        moTa: movieInfo?.moTa,
        hinhAnh: movieInfo?.hinhAnh,
        ngayKhoiChieu: movieInfo?.ngayKhoiChieu,
        danhGia: movieInfo?.danhGia,
      },
      imgSrc: movieInfo?.hinhAnh,
    });
  };
  handleOnChange = (event) => {
    let { name, value } = event.target;

    this.setState(
      {
        values: {
          ...this.state.values,
          [name]: value,
        },
      },
      () => {
        console.log(this.state.values);
      }
    );
  };
  handleChangeDateTime = (event) => {
    let { value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        ngayKhoiChieu: value,
      },
    },()=>{
      console.log("Ngay:",this.state.values.ngayKhoiChieu);
    });
  };
  handleChangeFile = (event) => {
    let file = event.target.files[0];
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgSrc = e.target.result;
        this.setState({
          imgSrc,
        });
      };
      this.setState({
        values: {
          ...this.state.values,
          hinhAnh: file,
        },
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const {values} = this.state;
    let formData = new FormData();
    formData.append("maPhim",values.maPhim)
    formData.append("tenPhim",values.tenPhim)
    formData.append("trailer",values.trailer)
    formData.append("maPhim",values.tenPhim)
    formData.append("biDanh",this.props.movieInfo.biDanh)
    formData.append("moTa",values.moTa)
    formData.append("ngayKhoiChieu",moment(values.ngayKhoiChieu).format("DD/MM/YYYY"))
    formData.append("danhGia",values.danhGia)
    formData.append("maNhom",values.maNhom)
    if(values.hinhAnh !== null){
      formData.append('File',values.hinhAnh,values.hinhAnh.name)
    }
    formData.append("hinhAnh",values.hinhAnh)
    console.log('formData', formData.get('File'));
    this.props.updateMovie(formData,this.props.curentUser.accessToken);
  };
  render() {
    const { values, imgSrc } = this.state;
    const { loading } = this.props;

    if (loading) return <Loader />;
    return (
      <div className="addMovie">
        <h3 style={{ color: "#001529" }} className="text-center">
          Chỉnh Sửa Phim
        </h3>
        <form className="themPhimForm" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>Mã Phim</label>
                  <input
                  readOnly="true"
                    type="text"
                    name="maPhim"
                    value={values.maPhim}
                    onChange={this.handleOnChange}
                    className="form-control form-control-sm w-75"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor>Tên Phim</label>
                  <input
                    type="text"
                    name="tenPhim"
                    value={values.tenPhim}
                    onChange={this.handleOnChange}
                    className="form-control form-control-sm w-75"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor>Trailer</label>
                  <input
                    type="text"
                    name="trailer"
                    value={values.trailer}
                    onChange={this.handleOnChange}
                    className="form-control form-control-sm w-75"
                  />
                </div>
              </div>
              <div className="col-6 contentRight">
                <div className="form-group date" data-provide="datepicker">
                  <label htmlFor>Ngày khởi chiếu</label>
                  <input
                    type="date"
                    name="ngayKhoiChieu"
                    format="dd-mm-yyyy"
                    value={values.ngayKhoiChieu}
                    onChange={this.handleChangeDateTime}
                    className="form-control form-control-sm w-75"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor>Đánh giá</label>
                  <select
                    className="custom-select "
                    name="danhGia"
                    onChange={this.handleOnChange}
                    value={values.danhGia}
                  >
                    <option selected>Chọn...</option>
                    <option value={1}>1 Sao</option>
                    <option value={2}>2 Sao</option>
                    <option value={3}>3 Sao</option>
                    <option value={4}>4 Sao</option>
                    <option value={5}>5 Sao</option>
                  </select>

                </div>
                <div className="form-group">
                  <label htmlFor> Hình ảnh</label>
                  <br />
                  <input
                    onChange={this.handleChangeFile}
                    type="file"
                    className="border"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <br />
                  <img src={imgSrc === "" ? this.props.movieInfo.hinhAnh : imgSrc} style={{width:"100px",height:"100px"}} alt="" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                name="moTa"
                value={values.moTa}
                onChange={this.handleOnChange}
                className="form-control"
                rows={5}
              />
            </div>
          </div>
          <div className="buttonThem text-center">
            <button className="btn btn-primary">Cập Nhật</button>
          </div>
        </form>
      </div>
    );
  }
  // componentDidMount() {
  //   this.props.getMovieInfo(this.props.match.params.id);
  //   this.props.getMovieInfo(this.props.match.params.id);
  //   const { movieInfo } = this.props;
  //   this.setState({
  //     values: {
  //       ...this.state.values,
  //       maPhim: movieInfo.maPhim,
  //       tenPhim: movieInfo.tenPhim,
  //       trailer: movieInfo.trailer,
  //       moTa: movieInfo.moTa,
  //       hinhAnh: movieInfo.hinhAnh,
  //       ngayKhoiChieu: movieInfo.ngayKhoiChieu,
  //       danhGia: movieInfo.danhGia,
  //     },
  //     imgSrc: movieInfo.hinhAnh,
  //   });
  // }
}
const mapStateToProps = (state) => ({
  movieInfo: state.editMovieReducer.movieInfo,
  loading: state.editMovieReducer.loading,
  curentUser: state.authReducer.curentUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateMovie: (formData,token)=> {
    dispatch(actUpdateMovie(formData,token))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);
