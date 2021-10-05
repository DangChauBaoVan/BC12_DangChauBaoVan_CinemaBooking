import { actClearUserInfo } from "containers/clients/UserInfo/module/action";
import { actLogOut } from "containers/shared/Auth/module/action";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  state = {
    isTop: true,
  };
  handleLogout = ()=>{
    this.props.logout();
    this.props.clearUserInfo();
    this.props.history.push("/");
  }
  
  render() {
    const { curentUser } = this.props;
    return (
      
      <div className={`header ${this.state.isTop ? 'position-relative' : 'position-fixed'}` } id="header">
        <nav className="navbar navbar-expand-sm navbar-light">
          
          <Link className="navbar-brand" to="/" id="navbarLogo">
            <img
              src="https://tix.vn/app/assets/img/icons/web-logo.png"
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mt-2 mt-lg-0 ">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Lịch Chiếu <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Cụm rạp
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tin Tức
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seat-plan">
                  Đặt Vé
                </Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav mt-2 mt-lg-0 ">
            {curentUser ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello! {curentUser.hoTen}
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/user-info" >
                    Account
                  </Link>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="" onClick={this.handleLogout}>
                    Log Out
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <img
                    className="btnLogin"
                    src="https://tix.vn/app/assets/img/avatar.png"
                  />
                  Đăng Nhập
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
  }
}

const mapStateToProps = (state) => ({
  curentUser: state.authReducer.curentUser,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actLogOut()),
  clearUserInfo: () => dispatch(actClearUserInfo())
});

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Header));
