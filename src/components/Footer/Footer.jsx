import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer mt-5" style={{ backgroundColor: '#222', height: "450px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 mt-4 text-left">
                            <div className="tix" style={{ color: 'white' }}>
                                <p>TIX</p>
                            </div>
                            <div className="info d-flex" style={{ color: 'grey' }}>
                                <div className="left">
                                    <p>FAQ</p>
                                    <p>Brand Guidelines</p>
                                </div>
                                <div className="right text-right ml-5">
                                    <p>Thỏa thuận sử dụng</p>
                                    <p>Chính sách bảo mật</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <p className="doitac text-left mt-4" style={{ color: 'white' }}>ĐỐI TÁC</p>
                            <div className="row">
                                <div className="col-2">
                                    <a target="_blank" href="https://www.cgv.vn/">
                                        <img className="iconConnect mb-3" src="./images/cgv.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.megagscinemas.vn/">
                                        <img className="iconConnect mb-3" src="./images/megags.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="http://starlight.vn/">
                                        <img className="iconConnect mb-3" src="./images/STARLIGHT.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.agribank.com.vn/">
                                        <img className="iconConnect mb-3" src="./images/AGRIBANK.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                </div>

                                <div className="col-2">
                                    <a target="_blank" href="https://www.bhdstar.vn/">
                                        <img className="iconConnect mb-3" src="./images/bhd.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.betacinemas.vn/home.htm">
                                        <img className="iconConnect mb-3" src="./images/bt.jpg" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.dcine.vn/">
                                        <img className="iconConnect mb-3" src="./images/dcine.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.vietinbank.vn/web/home/vn/index.html">
                                        <img className="iconConnect mb-3" src="./images/VIETTINBANK.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                </div>

                                <div className="col-2">
                                    <a target="_blank" href="https://www.galaxycine.vn/">
                                        <img className="iconConnect mb-3" src="./images/galaxycine.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="http://ddcinema.vn/">
                                        <img className="iconConnect mb-3" src="./images/dongdacinema.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://zalopay.vn/">
                                        <img className="iconConnect mb-3" src="./images/zalopay_icon.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.indovinabank.com.vn/">
                                        <img className="iconConnect mb-3" src="./images/IVB.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                </div>

                                <div className="col-2">
                                    <a target="_blank" href="http://cinestar.com.vn/">
                                        <img className="iconConnect mb-3" src="./images/cinestar.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://touchcinema.com/">
                                        <img className="iconConnect mb-3" src="./images/TOUCH.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://www.payoo.vn/">
                                        <img className="iconConnect mb-3" src="./images/payoo.jpg" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://webv3.123go.vn/">
                                        <img className="iconConnect mb-3" src="./images/123go.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                </div>

                                <div className="col-2">
                                    <a target="_blank" href="https://lottecinemavn.com/LCHS/index.aspx">
                                        <img className="iconConnect mb-3" src="./images/lottecinema.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://cinemaxvn.com/">
                                        <img className="iconConnect mb-3" src="./images/cnx.jpg" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://portal.vietcombank.com.vn/Pages/Home.aspx">
                                        <img className="iconConnect mb-3" src="./images/VCB.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                    <a target="_blank" href="https://laban.vn/">
                                        <img className="iconConnect mb-3" src="./images/laban.png" style={{ backgroundColor: '#fff', width: '30px', borderRadius: '50%' }} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-2 mt-4">
                            <p className="text-left" style={{ color: 'white' }}>MOBILE APP</p>
                            <div className="app d-flex">
                                <div className="appple">
                                    <a target="_blank" href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197">
                                        <img className="iconConnect" src="./images/apple-logo.png" style={{ width: '30px' }} />
                                    </a>
                                </div>

                                <div className="appple ml-3">
                                    <a target="_blank" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                                        <img className="iconConnect" src="./images/android-logo.png" style={{ width: '30px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-2 mt-4">
                            <p className="" style={{ color: 'white' }}>SOCIAL</p>
                            <div className="social d-flex">
                                <div className="facebook text-left ml-5">
                                    <a target="_blank" href="https://www.facebook.com/tix.vn/">
                                        <img className="iconConnect" src="./images/facebook-logo.png" style={{ width: '30px' }} />
                                    </a>
                                </div>

                                <div className="zalo ml-3">
                                    <a target="_blank" href="https://zalo.me/tixdatve">
                                        <img className="iconConnect" src="./images/zalo-logo.png" style={{ width: '30px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="hrFooter" style={{ borderBottom: '1px solid #4a4a4a' }} />
                </div>

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-9">
                            <div className="d-flex">
                                <div className="logo-left">
                                    <img src="./images/zion-logo.jpg" alt="" style={{ borderRadius: '15px' }} />
                                </div>

                                <div className="text text-left ml-4" style={{ color: 'white' }}>
                                    TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
                                    <br />
                                    Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                                    Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                                    đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                                    <br />
                                    Số Điện Thoại (Hotline): 1900 545 436
                                    <br />
                                    Email: support@tix.vn
                                </div>
                            </div>
                        </div>

                        <div className="col-2 ml-5">
                            <a target="_blank" href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1">
                                <img className="iconConnect text-left ml-5" src="./images/bocongthuong.png" style={{ width: '150px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}