import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../resoure/css/Header.css'
import '../resoure/css/PhotoAlbum.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import img1 from '../resoure/image/1.jpg';
import img2 from '../resoure/image/2.jpg';
import img3 from '../resoure/image/3.jpg';
import img4 from '../resoure/image/4.jpg';
import img5 from '../resoure/image/5.jpg';
import img6 from '../resoure/image/6.jpg';


function PhotoAlbum() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;


    return (


        <div className="container">
            {/* 상단 타이틀*/}
            <p />
            <hr className="hr" />
            <div className="title">
                <Link to="/MainCalendar">
                    <button className="title-btn">＜</button>
                </Link>
                <h3>사진첩</h3>
                <h3> </h3>
            </div>
            <hr className="hr" />

            {/* 검색 할 날짜 선택*/}
            <div class="date-pilter">
                <div class="pilter-text item">여행 날짜</div>
                <div class="item">
                    <DatePicker className="datepicker-st"
                        locale={ko}
                        dateFormat="yyyy년 MM월 dd일"

                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        withPortal
                        isClearable={true}
                    // placeholderText=""
                    />
                </div>
            </div>

            <div class="place-pilter">
                <span class="pilter-text">여행 장소</span>
                <input type="text" className="place-text" id="place" />
                <button className="btn-search btn-search-color" id="btn-search">검색</button>
            </div>

            <div id="memory-title"><h4>| 추억여행</h4></div>


            <div class="photo-layout">



                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_01" src={img1} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
                </div>
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_02" src={img2} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-2">2022.01.25 여수</button></Link>
                </div>
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_03" src={img3} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-3">2022.02.07 남산타워</button></Link>
                </div>
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_04" src={img4} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-4">2022.03.17 제주도</button></Link></div>
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_05" src={img5} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-5">2022.04.20 속초</button></Link></div>
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_06" src={img6} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-6">2022.05.03 뉴욕</button></Link></div>

            </div>


        </div>

    );
}


export default PhotoAlbum;