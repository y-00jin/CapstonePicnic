import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resoure/css/MemoryWrite.css';
import 'C:/Capstone/picnic-front/src/sass/custom.css/custom.css';
import '../resoure/css/PhotoAlbum.css'

function MemoryWrite(){
    return(
        <>
        {/* 타이틀 바 */}
        <div className="container">
            <p/>
            <hr className="hr" />
        
            <div className="title">
                <Link to="/Calendar">
                    <button className="title-btn">＜</button>
                </Link>
                <h3>여행 쓰기</h3>
                <h3></h3>
            </div>
            <hr className="hr" />
        </div>

        {/* 여행 기록 부분 */}
        <div class="container">
            <div class="Memory-record-font">
                <p>　</p>
                <div class="input-group input-group-lg">
                    <span class="input-group-text" id="basic-addon1">여행 날짜</span>
                    <input type="text" readonly class="form-control" id="date" value="2022-04-09"/>
                </div>
                <p/>
                <div class="input-group input-group-lg">
                    <span class="input-group-text" id="basic-addon1">여행 장소</span>
                    <input type="text" className="form-control" placeholder=" " aria-label="place" aria-describedby="basic-addon1"/>
                </div>
                <p/>
                <div class="input-group input-group-lg">
                    <span class="input-group-text">여행 기록</span>
                    <textarea class="form-control" aria-label="record"></textarea>
                </div>
            </div>
        </div>
        <p>　</p>

        {/* 탭 버튼 */}
        <div class="Memory-button">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#post">게시물</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#picture">사진</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#video">동영상</a>
            </li>
        </ul>
        </div>

        <div class="tab-content">
            <div class="tab-pane container active" id="post">게시물</div>
            <div class="tab-pane container" id="picture">사진</div>
            <div class="tab-pane container" id="video">동영상</div>
        </div>

        </>
    );
}

export default MemoryWrite;