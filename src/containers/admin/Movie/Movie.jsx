import React, { Component } from "react";
import { actDeleteMovie, actGetMovieList } from "./module/action";
import { connect } from "react-redux";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagiation";
import Moment from "react-moment";
import "./Movie.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { actGetMovieInfo } from "./EditMovie/module/action";
class Movie extends Component {
  state = {
    currentPage: 1,
    moviePerPage: 5,
    disabled: true,
    search: "",
  };
  paginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  handleGetMovie = (movieId) => {
    this.props.getMovieInfo(movieId);
  };
  handleDelete = (movieId) => {
    this.props.deleteMovie(movieId, this.props.curentUser.accessToken);
  };
  handleOnChange = (event) => {
    let { name, value } = event.target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(this.state.search);
      }
    );
  };
  handleSearch = (event) => {
    event.preventDefault();
    this.props.getMovieList(this.state.search);
  };
  render() {
    const { listMovie, loading } = this.props;
    if (loading) return <Loader />;
    const { currentPage, moviePerPage, disabled } = this.state;
    const indexOfLastMovie = currentPage * moviePerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
    const currentMovie = listMovie.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
      <div className="container-fluid  adminListMovie" onLoad={this.handleLoad}>
        <div className="themPhim text-left mb-4">
          <Link
            to="/admin/addmovie"
            className="btn btn-warning text-white text-uppercase"
            style={{ borderColor: "none" }}
            data-toggle="modal"
            data-target="#themPhimModal"
          >
            THÊM PHIM
            <Icon icon={faPlus} className="faPlusIcon" />
          </Link>
        </div>
        <form className="searchBar w-75 mb-4" onSubmit={this.handleSearch}>
          <div className="input-group">
            <div className="input-group-prepend">
              <button
                id="button-addon8"
                type="submit"
                className="btn btn-primary"
              >
                <Icon icon={faSearch} className="faSearchIcon" />
              </button>
            </div>
            <input
              type="search"
              name="search"
              value={this.state.search}
              onChange={this.handleOnChange}
              placeholder="Nhập phim bạn cần tìm?"
              aria-describedby="button-addon8"
              className="form-control"
            />
          </div>
        </form>
        {console.log(currentMovie)}
        {!(currentMovie === [] )? (
          <>
          <div className="container-fluid text-center containerTable">
            <table className="table table-hover table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Mã Phim</th>
                  <th scope="col">Tên Phim</th>
                  <th scope="col">Hình Ảnh</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Ngày Khởi Chiếu</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentMovie.map((movie, index) => {
                  return (
                    <tr key={movie.maPhim}>
                      <td scope="row" style={{ width: "5%" }}>
                        {movie.maPhim}
                      </td>
                      <td style={{ width: "10%" }}>{movie.tenPhim}</td>
                      <td>
                        <img
                          src={`${movie.hinhAnh}`}
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                          }}
                        />
                      </td>
                      <td style={{ width: "25%" }} className="text-left">
                        <p className="moTaStyle">{movie.moTa}</p>
                      </td>
                      <td style={{ width: "10%" }}>
                        <Moment format="DD/MM/YYYY">
                          {movie.ngayKhoiChieu}
                        </Moment>
                      </td>
                      <td style={{ width: "25%" }}>
                        <Link to={`/admin/showtime/${movie.maPhim}`} className="btn btn-success">
                          Tạo Lịch Chiếu
                        </Link>
                        <Link
                          to={`/admin/editmovie/${movie.maPhim}`}
                          onClick={() => this.handleGetMovie(movie.maPhim)}
                          className="btn btn-info mx-2"
                        >
                          Sửa
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(movie.maPhim)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            moviesPerPage={moviePerPage}
            totalMovies={listMovie.length}
            paginate={this.paginate}
          />
        </>
          
        ) : (
          <>
            <h1>Can't not find your film</h1>
          </>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.props.getMovieList();
  }
}
const mapStateToProps = (state) => ({
  listMovie: state.movieReducer.listMovie,
  loading: state.movieReducer.loading,
  errors: state.movieReducer.errors,
  curentUser: state.authReducer.curentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getMovieList: (movieName) => {
    dispatch(actGetMovieList(movieName));
  },
  getMovieInfo: (movieId) => {
    dispatch(actGetMovieInfo(movieId));
  },
  deleteMovie: (movieId, token) => {
    dispatch(actDeleteMovie(movieId, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
