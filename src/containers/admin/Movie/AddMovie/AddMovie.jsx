import React, { Component } from "react";
import "./AddMovie.scss";
import moment from "moment";
import { actAddMovie } from "../module/action";
import { connect } from "react-redux";
class AddMovie extends Component {
  state = {
    values: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      hinhAnh: {},
      moTa: "",
      maNhom: "GP08",
      ngayKhoiChieu: "",
      danhGia: "",
    },
    imgSrc: null,
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
    value = moment(value).format("DD/MM/YYYY");
    this.setState({
      values: {
        ...this.state.values,
        ngayKhoiChieu: value,
      },
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
          hinhAnh:file
        }
      })
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const {values} = this.state;
    let formData = new FormData();
    formData.append("tenPhim",values.tenPhim)
    formData.append("trailer",values.trailer)
    formData.append("maPhim",values.tenPhim)
    formData.append("moTa",values.moTa)
    formData.append("ngayKhoiChieu",values.ngayKhoiChieu)
    formData.append("danhGia",values.danhGia)
    formData.append("maNhom",values.maNhom)
    formData.append('File',values.hinhAnh,values.hinhAnh.name)
    console.log('formData', formData.get('File'));
    this.props.addMovie(formData);
  };
  
  render() {
    const { values, imgSrc } = this.state;
    return (
      <div className="addMovie" >
        <h3 style={{ color: "#001529" }} className="text-center">
          Thêm Mới Phim
        </h3>
        <form className="themPhimForm" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>Mã Phim</label>
                  <input
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
                  >
                    <option selected>Chọn...</option>
                    <option value={1}>1 Sao</option>
                    <option value={2}>2 Sao</option>
                    <option value={3}>3 Sao</option>
                    <option value={4}>4 Sao</option>
                    <option value={5}>5 Sao</option>
                  </select>

                  {/* <input
                    type="text"
                    name="danhGia"
                    value={values.danhGia}
                    onChange={this.handleOnChange}
                    className="form-control form-control-sm w-75"
                  /> */}
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
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt="..."
                      style={{ width: "150px", height: "150px" }}
                    />
                  ) : (
                    <></>
                  )}
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
            <button className="btn btn-primary">Thêm</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addMovie: (formData) => {
    dispatch(actAddMovie(formData));
  },
});
export default connect(null, mapDispatchToProps)(AddMovie);
