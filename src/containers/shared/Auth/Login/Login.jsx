import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Login.scss";
import { actLogin } from "../module/action";
import Loader from "components/Loader/Loader";
import BackToHome from "components/Button/BackToHome/BackToHome";
import { actGetUser } from "containers/clients/UserInfo/module/action";
class Login extends Component {
  state = {
    values: {
      taiKhoan: "",
      matKhau: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
    },
    isValidUsername: false,
    isValidPassword: false,
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
    let { name, value } = event.target;
    let { isValidUsername, isValidPassword } = this.state;
    let errorMessage = "";

    if (value === "") {
      switch (name) {
        case "taiKhoan":
          errorMessage = `Username can not be empty!`;
          break;
        case "matKhau":
          errorMessage = "Password can not be empty!";
        default:
          break;
      }
    }
    switch (name) {
      case "username":
        isValidUsername = errorMessage === "" ? true : false;
        break;
      case "password":
        isValidPassword = errorMessage === "" ? true : false;
        break;

      default:
        break;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: errorMessage,
      },
      isValidUsername,
      isValidPassword,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.values);
  };

  render() {
    const { loading, error, curentUser } = this.props;

    if (loading) return <Loader />;
    return !curentUser ? (
      <div className="login">
        <section className="login-block">
          <div className="container">
            <div className="row">
              <div className="col-md-4 login-sec">
                <h2 className="text-center">Welcome</h2>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="text-uppercase">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="taiKhoan"
                      value={this.state.values.taiKhoan}
                      onChange={this.handleOnChange}
                      onBlur={this.handleError}
                      onKeyUp={this.handleError}
                    />
                    <smail className="text-danger">
                      {this.state.errors.taiKhoan}
                    </smail>
                  </div>
                  <div className="form-group">
                    <label className="text-uppercase">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="matKhau"
                      value={this.state.values.matKhau}
                      onChange={this.handleOnChange}
                      onBlur={this.handleError}
                      onKeyUp={this.handleError}
                    />
                    <smail className="text-danger">
                      {this.state.errors.matKhau}
                    </smail>
                    <br />
                    {error && (
                      <smail className="text-danger mt-2">
                        Your account does not exist!
                      </smail>
                    )}
                  </div>
                  <div className="form-check">
                    <button
                      type="submit"
                      className="btn btn-login text-center mb-4"
                    >
                      Login
                    </button>
                  </div>
                  <span className="mr-2">Don't have an account?</span>
                  <Link to="/Register">Sign Up</Link>
                </form>
                <BackToHome />
              </div>
              <div className="col-md-8 banner-sec">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={0}
                      className="active"
                    />
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={1}
                    />
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={2}
                    />
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100 img-fluid"
                        src="http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100 img-fluid"
                        src="http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png"
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100 img-fluid"
                        src="http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  curentUser: state.authReducer.curentUser,
  loading: state.authReducer.loading,
  error: state.authReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch(actLogin(user));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
