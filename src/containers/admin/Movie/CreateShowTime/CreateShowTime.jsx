import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Cascader } from "antd";
import {
  DatePicker,
  Space,
  InputNumber,
  Select,
  Alert,
  Image,
  Table,
} from "antd";
import { useState } from "react";
import { useEffect } from "react";
import theaterApi from "apis/theaterApi";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { actGetMovieInfo } from "../EditMovie/module/action";
import { actGetShowtime } from "../module/action";
import Loader from "components/Loader/Loader";

export default function CreateShowTime(props) {
  const { curentUser } = useSelector((state) => state.authReducer);
  const { movieInfo } = useSelector((state) => state.editMovieReducer);
  const {showtime} =useSelector((state) => state.movieReducer)
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetMovieInfo(id))
    dispatch(actGetShowtime(id))
  }, []);
  
  console.log(showtime);
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: (values) => {
      const MySwal = withReactContent(Swal);
      theaterApi
        .createShowtime(values, curentUser.accessToken)
        .then((res) => {
          Swal.fire({
            toast: true,
            icon: "success",
            title: "Create Successfully",
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          history.push("/admin/movie");
          console.log("success");
        })
        .catch((error) => {
          MySwal.fire({
            title: "Unable To Create",
            type: "error",
            icon: "error",
            text: "Check your information again!",
            confirmButtonColor: "#de6262",
          });
          console.log("error", error.response?.data);
        });
    },
  });
  const [state, setState] = useState({
    heThongRap: [],
    cumRapChieu: [],
    cumRap: [],
  });
  useEffect(async () => {
    try {
      let result = await theaterApi.getTheaterList();
      setState({
        ...state,
        heThongRap: result.data,
      });
    } catch (error) {}
  }, []);
  
  const handleChangeHeThongRap = async (values) => {
    try {
      let result = await theaterApi.getGroupTheaterInfo(values);
      setState({
        ...state,
        cumRapChieu: result.data,
      });
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
  const handleChangeCumRap = (value) => {
    const dsr = state.cumRapChieu
      .filter((crc) => crc.maCumRap === value)
      .map((crc) => crc.danhSachRap);

    setState({
      ...state,
      cumRap: dsr[0],
    });
  };
  const handleRapOption = () => {
    state.cumRap.forEach((cr) => console.log(cr.maRap));
  };
  const handleChangeRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeTicketPrices = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  
  return (
    <div>
      <div className="container text-left">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onSubmitCapture={formik.handleSubmit}
        >
          
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <h3 className="text-2xl ">
            Tạo Lịch Chiếu - {movieInfo.tenPhim}
          </h3>
            <Image width={100} height={100} src={movieInfo.hinhAnh} />
          </Form.Item>

          <Form.Item label="Hệ thống rạp">
            <Select
              options={state.heThongRap?.map((htr, index) => ({
                label: htr.tenHeThongRap,
                value: htr.maHeThongRap,
              }))}
              onChange={handleChangeHeThongRap}
              placeholder="Chọn hệ thống rạp"
            />
          </Form.Item>
          <Form.Item label="Cụm rạp">
            <Select
              options={state.cumRapChieu?.map((crc, index) => ({
                label: crc.tenCumRap,
                value: crc.maCumRap,
              }))}
              onChange={handleChangeCumRap}
              placeholder="Chọn cụm rạp"
            />
          </Form.Item>
          <Form.Item label="Rạp">
            {console.log(state.cumRap)}
            <Select
              options={state.cumRap?.map((cr, index) => ({
                label: cr?.tenRap,
                value: cr?.maRap,
              }))}
              onChange={handleChangeRap}
              placeholder="Chọn rạp"
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu giờ chiếu">
            <DatePicker
              showTime
              onChange={onChangeDate}
              onOk={onOk}
              format="DD/MM/YYYY hh:mm:ss"
            />
          </Form.Item>
          <Form.Item label="Giá vé">
            <InputNumber
              // min={75000}
              // max={150000}
              // defaultValue={75000}
              onChange={onChangeTicketPrices}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">Tạo lịch chiếu</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
