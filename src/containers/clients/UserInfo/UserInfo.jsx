import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./UserInfo.scss";
import { actGetUser, actUpdateUserInfo } from "./module/action";
import Loader from "components/Loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";

class UserInfo extends Component {
  state = {
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: "GP08",
      maLoaiNguoiDung: "KhachHang",
    },
    errors: {
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },

    isValidPassword: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidName: true,
    isValidForm: true,

    readOnly: true,
    showButton: false,
    updateError: "",
  };
  handleRender = () => {
    const { userInfo } = this.props;
    this.setState({
      values: {
        ...this.state.values,
        taiKhoan: userInfo.taiKhoan,
        matKhau: userInfo.matKhau,
        email: userInfo.email,
        soDt: userInfo.soDT,
        hoTen: userInfo.hoTen,
      },
    });
  };
  handleOnClick = () => {
    this.setState({
      readOnly: false,
      showButton: true,
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
        console.log(this.state);
      }
    );
  };

  handleError = (event) => {
    const { listUser } = this.props;
    let { name, value } = event.target;
    let { isValidPassword, isValidEmail, isValidPhone, isValidName } =
      this.state;
    let errorMessage = "";
    if (value === "") {
      switch (name) {
        case "matKhau":
          errorMessage = "Password can't be empty!";
          break;
        case "email":
          errorMessage = "Email can't be empty!";
          break;
        case "soDt":
          errorMessage = "Phone can't be empty!";
          break;
        case "hoTen":
          errorMessage = "Name can't be empty!";
          break;
        default:
          break;
      }
    }

    switch (name) {
      case "matKhau":
        if (value && (value.length < 6 || value.length > 12)) {
          errorMessage = "Password must be 6 - 12 characters!";
        }
        isValidPassword = errorMessage === "" ? true : false;
        break;
      case "email":
        const emailreRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        if (value && !value.match(emailreRegex)) {
          errorMessage = "Invalid email!";
        }
        if (value) {
          listUser.map((user) => {
            if (value === user.email) {
              return (errorMessage =
                "An account already exists with this email! Try Another");
            }
          });
        }
        isValidEmail = errorMessage === "" ? true : false;
        break;
      case "soDt":
        if (value && value.length !== 10) {
          errorMessage = "Invalid Phone Number! (Must be 10 digits)";
          if (!value.startsWith("0")) {
            errorMessage = "Phone number must be start at 0";
          }
        }
        isValidPhone = errorMessage === "" ? true : false;
        break;
      case "hoTen":
        const pattern = new RegExp(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if (value === "") {
          errorMessage = "Name can't be empty!";
        }
        if (value && !pattern.test(value)) {
          errorMessage = "Invalid Name!";
        }
        isValidName = errorMessage === "" ? true : false;
        break;

      default:
        break;
    }

    this.setState(
      {
        errors: {
          ...this.state.errors,
          [name]: errorMessage,
        },
        isValidPassword,
        isValidEmail,
        isValidPhone,
        isValidName,
      },
      () => {
        this.validForm();
      }
    );
  };
  validForm = () => {
    const { isValidName, isValidPassword, isValidEmail, isValidPhone } =
      this.state;
    if (isValidName && isValidPassword && isValidEmail && isValidPhone) {
      this.setState({
        isValidForm: true,
      });
    } else {
      this.setState({
        isValidForm: false,
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { curentUser } = this.props;
    console.log(curentUser);
    console.log(this.state.values);
    if (this.state.isValidForm === true) {
      this.setState({
        readOnly: true,
        showButton: false,
        updateError: "",
      });
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Update Successfully",
        animation: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      this.props.updateUserInfo(this.state.values, curentUser.accessToken);
    } else {
      this.setState({
        updateError: "Check your infomation again!",
      });
    }
  };
  handleRenderVe = () => {
    const { userInfo } = this.props;
    const thongTinDatVe = userInfo.thongTinDatVe;
    if (thongTinDatVe) {
      console.log(thongTinDatVe);
      {
        thongTinDatVe.map((ttdv) => {
          return (
            <>
              <div className="thongTinVe">
                <h3>Tên phim: {ttdv.tenPhim}</h3>
                <p>
                  Ngày đặt: {moment(ttdv.ngayDat).format("DD/MM/YYYY HH:MM:SS")}
                </p>
              </div>
              <hr />
            </>
          );
        });
      }
    } else {
      return (
        <div>
          <h1>Bạn chưa đặt vé nào!</h1>
        </div>
      );
    }
  };
  render() {
    const { loading } = this.props;
    const { readOnly, showButton, values } = this.state;

    if (loading) return <Loader />;

    return (
      <div className="userInfo" onLoad={this.handleRender}>
        <div className="container cProfile">
          <div className="row profile">
            <div className="col-md-3 leftContent">
              <div className="profile-sidebar">
                <div className="profile-userpic">
                  <img
                    src="https://picsum.photos/200/300"
                    className="img-responsive"
                    alt
                  />
                </div>
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {this.props.userInfo.hoTen}
                  </div>
                </div>

                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Thông Tin Tài Khoản
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Lịch Sử Đặt Vé
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="container">
                      <div className="userInfoTitle">
                        <h3 style={{ color: "#de6262" }}>
                          Thông Tin Tài Khoản
                        </h3>

                        <Icon
                          icon={faEdit}
                          color="#de6262"
                          className="faEditIcon"
                          size="2x"
                          onClick={this.handleOnClick}
                        />
                      </div>

                      <form className="User-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-6">
                              <div className="form-field">
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder=" "
                                  name="email"
                                  value={values.email}
                                  readOnly="true"
                                  onChange={this.handleOnChange}
                                  onBlur={this.handleError}
                                  onKeyUp={this.handleError}
                                />
                                <label htmlFor="name" className="form-label">
                                  Email
                                </label>
                              </div>

                              <div className="form-field">
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder=" "
                                  name="hoTen"
                                  readOnly={readOnly}
                                  value={values.hoTen}
                                  onChange={this.handleOnChange}
                                  onBlur={this.handleError}
                                  onKeyUp={this.handleError}
                                />
                                <label htmlFor="name" className="form-label">
                                  Họ Tên
                                </label>
                                <smail className="text-danger">
                                  {this.state.errors.hoTen}
                                </smail>
                              </div>

                              <div className="form-field">
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder=" "
                                  name="soDt"
                                  readOnly={readOnly}
                                  value={values.soDt}
                                  onChange={this.handleOnChange}
                                  onBlur={this.handleError}
                                  onKeyUp={this.handleError}
                                />
                                <label htmlFor="name" className="form-label">
                                  Số Điện Thoại
                                </label>
                                <smail className="text-danger">
                                  {this.state.errors.soDt}
                                </smail>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-field">
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder=" "
                                  name="taiKhoan"
                                  readOnly="true"
                                  value={values.taiKhoan}
                                  onChange={this.handleOnChange}
                                  onBlur={this.handleError}
                                  onKeyUp={this.handleError}
                                />
                                <label htmlFor="name" className="form-label">
                                  Tài Khoản
                                </label>
                              </div>
                              <div className="form-field">
                                <input
                                  type="password"
                                  className="form-input"
                                  placeholder=" "
                                  readOnly={readOnly}
                                  name="matKhau"
                                  value={values.matKhau}
                                  onChange={this.handleOnChange}
                                  onBlur={this.handleError}
                                  onKeyUp={this.handleError}
                                />
                                <label htmlFor="name" className="form-label">
                                  Mật Khẩu
                                </label>
                              </div>
                              <smail className="text-danger">
                                {this.state.errors.matKhau}
                              </smail>
                            </div>
                          </div>
                          <smail className="text-danger mb-4">
                            {this.state.updateError}
                          </smail>
                          {showButton ? (
                            <div>
                              <button
                                type="submit"
                                className="btn btn-edit text-center mt-4"
                              >
                                Cập Nhật
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <h3 style={{ color: "#de6262" }}>Lịch Sử Đặt Vé</h3>
                    <div className="container scrollbar w-100"  id="style-7" style={{paddingRight: "17px", overflowY:"hidden"}}>
                      <div className="hideScrollBar w-100" style={{overflowY:"scroll",height:"350px",boxSizing: "content-box"}}>
                      {this.props.userInfo.thongTinDatVe.map((ttdv) => {
                        return (
                          <>
                            <div className="thongTinVe">
                              <h3>Tên phim: {ttdv.tenPhim}</h3>
                              <p>
                                Ngày đặt:{" "}
                                {moment(ttdv.ngayDat).format(
                                  "DD/MM/YYYY HH:MM:SS"
                                )}
                              </p>
                            </div>
                            <hr />
                          </>
                        );
                      })}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { curentUser } = this.props;
    const user = {
      taiKhoan: curentUser.taiKhoan,
    };
    this.props.getUserInfo(user);
    // this.setState({
    //   values:{
    //     taiKhoan: this.props.userInfo.taiKhoan,
    //     matKhau: this.props.userInfo.matKhau,
    //     email: this.props.userInfo.email,
    //     soDt: this.props.userInfo.soDT,
    //     hoTen: this.props.userInfo.hoTen
    //   },
    // })
  }
}
const mapStateToProps = (state) => ({
  curentUser: state.authReducer.curentUser,
  error: state.userInfoReducer.error,
  loading: state.userInfoReducer.loading,
  userInfo: state.userInfoReducer.userInfo,
  listUser: state.authReducer.listUser,
});
const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (username) => {
    dispatch(actGetUser(username));
  },
  updateUserInfo: (userInfo, token) => {
    dispatch(actUpdateUserInfo(userInfo, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
