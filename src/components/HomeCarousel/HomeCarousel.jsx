import React, { Component } from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default class HomeCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://s3img.vcdn.vn/123phim/2021/03/1440x600-d04f3c.jpg"
              className="w-100"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/wopsvun/2019_08_15/avengers-endgame_waku.jpg"
              className="w-100"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://s3.cloud.cmctelecom.vn/tinhte1/2018/06/4332987_cover.jpg"
              className="w-100"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://hcmoviereviews.files.wordpress.com/2015/07/southpaw-poster.jpg"
              className="w-100 h-100"
              alt=""
            />
          </h3>
        </div>
      </Carousel>
    );
  }
}