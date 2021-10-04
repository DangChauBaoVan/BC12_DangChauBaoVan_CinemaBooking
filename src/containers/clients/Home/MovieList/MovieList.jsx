
import movieApi from "apis/movieApi";
import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import { actFetchAllMovie } from "../module/action";
import MovieItem from "../MovieItem/MovieItem";
import {connect} from 'react-redux';

class MovieList extends Component {

  render() {
    const {loading, listMovie} = this.props;
    if(loading) return <Loader/>
    return (
      <div className="container movieList">
        <p className="my-5">
          <span className="mx-4 h3 text-danger">Đang chiếu</span>
          <span className="mx-4 h4">Sắp chiếu</span>
        </p>
        <duiv className="row">
            {listMovie.map(movie =>{
              return <MovieItem movie={movie} key={movie.maPhim}/>
            })}
        </duiv>
      </div>
    );
  }
  componentDidMount(){
    movieApi.fetchAllMovieApi()
    .then(res =>{
      this.props.fetchAllMovie(res.data);
      // console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }
}
const mapStateToProps = state =>({
  listMovie: state.movieReducer.listMovie,
  loading: state.movieReducer.loading
})
const mapDispatchToProps = dispatch =>({
  fetchAllMovie: listMovie =>{
    dispatch(actFetchAllMovie(listMovie));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)