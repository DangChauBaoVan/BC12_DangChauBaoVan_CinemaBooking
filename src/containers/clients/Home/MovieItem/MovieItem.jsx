import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MovieItem.scss";

export default class MovieItem extends Component {
  render() {
    const { tenPhim, hinhAnh, maPhim, trailer } = this.props.movie;
    console.log(maPhim);
    return (
      <div className="col-3 my-4 border-0 rounded movieItem">
        <div className="card cardItem">
          <Link to={`/movie-detail/${maPhim}`}>
            <img
              className="card-img-top"
              src={hinhAnh}
              alt
              style={{ height: "400px" }}
            />
            <div className="card-body cardText">
              <h5 className="card-title text-left">{tenPhim}</h5>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}