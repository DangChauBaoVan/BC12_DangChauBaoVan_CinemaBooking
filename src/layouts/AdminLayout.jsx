import withLayout from "hocs/withLayout";
import React, { Component } from "react";
import { Layout, Menu, Dropdown, message, Divider } from "antd";
import { Link } from "react-router-dom";
import "./AdminLayout.scss";
import { connect } from "react-redux";
import {
  UnorderedListOutlined,
  DownOutlined,
  TeamOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">
      <Link to="/user-info">Account</Link>
    </Menu.Item>
    <Divider style={{ marginTop: "2px", marginBottom: "2px" }} />
    <Menu.Item key="2">Log Out</Menu.Item>
  </Menu>
);
class AdminLayout extends Component {
  render() {
    const { curentUser } = this.props;
    return (
      <Layout className="adminLayout">
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo">
            <img
              src="https://tix.vn/app/assets/img/icons/web-logo.png"
              alt=""
            />
            <p className="text-white">Admin Dashboard</p>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
            {/* <Menu.Item key="1" icon={<AppstoreOutlined />}>
              <Link to="/admin/">Dashboard</Link>
            </Menu.Item> */}
            <SubMenu
              key="sub2"
              icon={<VideoCameraOutlined />}
              title="Movie Management"
            >
              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                <Link to="/admin/movie">List Movie</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<PlusSquareOutlined />}>
                <Link to="/admin/addmovie">Add Movie</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/admin/user">User</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header
            className="site-layout-background text-right"
            style={{ padding: 0 }}
          >
            <Dropdown overlay={menu} arrow placement="bottomRight">
              <a
                className="ant-dropdown-link text-white mr-4"
                onClick={(e) => e.preventDefault()}
              >
                Hello! {curentUser.hoTen}
              </a>
            </Dropdown>
            {/* <p className="text-right text-white mr-5">Hello! {curentUser.hoTen}</p> */}
          </Header>
          <Content  style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height:"100vh",
          }}>
            <div 
              
              style={{ padding: 24, textAlign: "center" ,backgroundColor:"fff",height:"auto"}}
            >
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  curentUser: state.authReducer.curentUser,
});
export default withLayout(connect(mapStateToProps)(AdminLayout));
