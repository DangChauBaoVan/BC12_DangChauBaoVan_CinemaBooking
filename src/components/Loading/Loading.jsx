import React, { Component } from "react";
import { connect } from "react-redux";

class Loading extends Component {
  render() {
    const { loading } = this.props;
    return (
        
      <>{loading ?
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "99",
          }}
        >
          <div className="text-center">
            <div>
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p
                className="text-white"
                style={{ fontSize: "25px", fontWeight: "Bold" }}
              >
                Đang xử lý...
              </p>
            </div>
          </div>
        </div> 
        : ""}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.bookTicketReducer.loadingDatVe,
});

export default connect(mapStateToProps)(Loading);
