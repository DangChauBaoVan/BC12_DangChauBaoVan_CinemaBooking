import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Pagination.scss";

export default class Pagination extends Component {
  render() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.totalMovies / this.props.moviesPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    
    return (
      <nav className="paginationCover">
        <ul className="pagination">
          {/* <li className="page-item " >
            <button className="page-link"
            disabled="false"
            onClick={() => this.props.prevPage()}
            >Prev</button>
          </li> */}

          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <button
                onClick={() => this.props.paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
          {/* <li className="page-item">
            <button className="page-link" >
              Next 
            </button>
          </li> */}
        </ul>
      </nav>
    );
  }
}
