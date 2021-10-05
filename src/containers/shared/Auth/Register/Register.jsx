import BackToHome from "components/Button/BackToHome/BackToHome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { actFecthAllUser, actLogin, actRegister } from "../module/action";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Register.scss";
import { actGetUser } from "containers/clients/UserInfo/module/action";
class Register extends Component {
  state = {
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP08",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    isValidUsername: false,
    isValidPassword: false,
    isValidEmail: false,
    isValidPhone: false,
    isValidName: false,
    isValidForm: false,
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
    let {
      isValidUsername,
      isValidPassword,
      isValidEmail,
      isValidPhone,
      isValidName,
    } = this.state;
    let errorMessage = "";
    if (value === "") {
      switch (name) {
        case "taiKhoan":
          errorMessage = `Username can't be empty!`;
          break;
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
      case "taiKhoan":
        if (value) {
          listUser.map((user) => {
            if (value === user.taiKhoan) {
              return (errorMessage = "Username already exist!");
            }
          });
          if (value.length < 6 || value.length > 12) {
            errorMessage = "Username must be 6 to 12 characters!";
          }
        }
        isValidUsername = errorMessage === "" ? true : false;
        break;
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
        if(value){
          listUser.map(user => {
            if( value === user.email){
              return errorMessage = "An account already exists with this email! Try Another"
            }
          })
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
        if(value===""){
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
        isValidUsername,
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
    const {
      isValidName,
      isValidPassword,
      isValidEmail,
      isValidPhone,
      isValidUsername,
    } = this.state;
    if (
      isValidName &&
      isValidPassword &&
      isValidEmail &&
      isValidPhone &&
      isValidUsername
    ) {
      this.setState({
        isValidForm: true,
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const MySwal = withReactContent(Swal);

    if (this.state.isValidForm) {
      event.preventDefault();
      const loginValues = {
        taiKhoan: this.state.values.taiKhoan,
        matKhau: this.state.values.matKhau,
      }
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Register Successfully',
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
      this.props.register(this.state.values);
      this.props.login(loginValues);
    } else {
      MySwal.fire({
        title: "Unable To Sign Up",
        type: "error",
        icon: "error",
        text: "Check your information again!",
        confirmButtonColor: "#de6262",
      });
    }
  };
  render() {
    const { curentUser } = this.props;
    return !curentUser ? (
      <div className="Register">
        <section className="login-block">
          <div className="container w-50">
            <div className="login-sec">
              <h2 className="text-center">Welcome</h2>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div>
                    <smail className="text-danger">
                      {this.state.errors.taiKhoan}
                    </smail>
                    <div className="form-field">
                      <input
                        type="text"
                        className="form-input w-75"
                        placeholder=" "
                        name="taiKhoan"
                        value={this.state.values.taiKhoan}
                        onChange={this.handleOnChange}
                        onBlur={this.handleError}
                        onKeyUp={this.handleError}
                      />
                      <label htmlFor="name" className="form-label">
                        Username
                      </label>
                    </div>
                    <smail className="text-danger">
                      {this.state.errors.matKhau}
                    </smail>
                    <div className="form-field">
                      <input
                        type="password"
                        className="form-input w-75"
                        placeholder=" "
                        name="matKhau"
                        value={this.state.values.matKhau}
                        onChange={this.handleOnChange}
                        onBlur={this.handleError}
                        onKeyUp={this.handleError}
                      />
                      <label htmlFor="Pasword" className="form-label">
                        Password
                      </label>
                    </div>
                    <smail className="text-danger">
                      {this.state.errors.email}
                    </smail>
                    <div className="form-field">
                      <input
                        type="email"
                        className="form-input w-75"
                        placeholder=" "
                        name="email"
                        value={this.state.values.email}
                        onChange={this.handleOnChange}
                        onBlur={this.handleError}
                        onKeyUp={this.handleError}
                      />
                      <label htmlFor="Email" className="form-label">
                        Email
                      </label>
                    </div>
                    <smail className="text-danger">
                      {this.state.errors.soDt}
                    </smail>
                    <div className="form-field">
                      <input
                        type="number"
                        className="form-input w-75"
                        placeholder=" "
                        name="soDt"
                        value={this.state.values.soDt}
                        onChange={this.handleOnChange}
                        onBlur={this.handleError}
                        onKeyUp={this.handleError}
                      />
                      <label htmlFor="Email" className="form-label">
                        Phone
                      </label>
                    </div>
                    <smail className="text-danger">
                      {this.state.errors.hoTen}
                    </smail>
                    <div className="form-field">
                      <input
                        type="text"
                        className="form-input w-75"
                        placeholder=" "
                        name="hoTen"
                        value={this.state.values.hoTen}
                        onChange={this.handleOnChange}
                        onBlur={this.handleError}
                        onKeyUp={this.handleError}
                      />
                      <label htmlFor="Email" className="form-label">
                        FullName
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-login text-center">
                    Sign Up
                  </button>
                </div>
                <span className="mr-2 pb-5">Already have an account?</span>
                <Link to="/Login">Sign In</Link>
              </form>
              <BackToHome />
            </div>
          </div>
        </section>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
  componentDidMount() {
    this.props.fetchAllUser();
  }
}

const mapStateToProps = (state) => ({
  listUser: state.authReducer.listUser,
  curentUser: state.authReducer.curentUser,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllUser: () => {
    dispatch(actFecthAllUser());
  },
  register: (account) => {
    dispatch(actRegister(account));
  },
  login: (user) => {
    dispatch(actLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
