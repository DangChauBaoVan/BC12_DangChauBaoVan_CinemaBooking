import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import movieApi from "apis/movieApi";
import { connect } from "react-redux";
import moment from "moment";
import './MovieDetails.scss';
import { actFetchMovieDetail } from "./module/action";
import { Link } from "react-router-dom";


class MovieDetails extends Component {
  render() {
    const { loading, movieDetail, trailer } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="container mt-5">
        <div className="card mb-3 w-100 movieDetail">
          <div className="row no-gutters">
            <div className="col-md-4 detailImage">
              <img className="img-fluid" src={movieDetail.hinhAnh} />
            </div>
            <div className="col-md-8 detailInfo">
              <div className="card-body detailBody">
                <h5 className="card-title text-left">{movieDetail.tenPhim}</h5>
                <h1 className="text-left mt-4">SUMARY</h1>
                <p className="card-text text-left">{movieDetail.moTa}</p>
                <p className="card-text text-left"> 
                  <span>
                  {/* <i class="fa fa-calendar-week"></i> */}
                  </span>
                  <span>
                  {moment(movieDetail.ngayKhoiChieu).format('DD/MM/YYYY')}
                  </span>
                </p>
              </div>
              <div className="text-left detailButton">
              <button className="btn btn-success mx-3" data-toggle="modal" data-target="#trailer"> View Trailer</button>
              <button className="btn btn-danger mx-3">Buy ticket</button>
              </div>
              <div>
            <div className="modal fade" id="trailer">
              <div className="modal-dialog">
                <div className="modal-content" style={{ width: "600px" }}>
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <iframe
                      src={trailer}
                      style={{ width: "500px", height: "300px" }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
        <h1 className="my-5">Show Time</h1>
        <div class="row">
          <div class="col-3">
            <div
              class="nav flex-column nav-pills text-left"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {movieDetail.heThongRapChieu.map((heThongRap, idx) => {
                return (
                  <a
                  key={heThongRap.maHeThongRap}
                    className={`nav-link ${idx === 0 && 'active'}`}
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href={`#${heThongRap.maHeThongRap}`}
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <img
                      src={heThongRap.logo}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <span style={{ textTransform: "uppercase", fontWeight: 'bold'}}>
                      {heThongRap.tenHeThongRap}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              {movieDetail.heThongRapChieu.map((heThongRap) => {
                return (
                  <div
                    key={heThongRap.maHeThongRap}
                    className="tab-pane fade show"
                    id={heThongRap.maHeThongRap}
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    {heThongRap.cumRapChieu.map(cumRap =>{
                      return  (
                        <div className="text-left name">
                          {/* <img src={cumRap.hinhAnh} style={{width: '50px'}}/> */}
                          <h3>{cumRap.tenCumRap}</h3>
                          <div className="my-4 seatPlan">
                            {cumRap.lichChieuPhim.map(lichChieu =>{
                              return (
                                <Link to={`/seat-plan/${lichChieu.maLichChieu}`} className="btn btn-secondary mr-3 mb-3 seat" >{moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );

  }
  componentDidMount() {
    // const {movieId} = this.props.match.params;
    movieApi
      .fetchMovieDetailApi(this.props.match.params.movieId)
      .then((res) => {
        this.props.fetchMovieDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
const mapStateToProps = (state) => ({
  movieDetail: state.movieDetailReducer.movieDetail,
  loading: state.movieDetailReducer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetail: (movieDetail) => {
    dispatch(actFetchMovieDetail(movieDetail));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);