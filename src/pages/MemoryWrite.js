import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Capstone/picnic-front/src/sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';

function MemoryWrite(){
    return(
        <div class="container">
            {/* 타이틀 바 */}
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

            {/* 여행 기록 부분 */}
            <p/>
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
            <p>　</p>

            {/* 탭 버튼 */}
            <nav>
                <div class="nav nav-tabs" id="myTab" role="tablist">
                    　　　　　　　　　　　　　　　　
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-post" type="button" role="tab" aria-controls="nav-post" aria-selected="true">게시물</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-picture" type="button" role="tab" aria-controls="nav-picture" aria-selected="false">사진</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-video" type="button" role="tab" aria-controls="nav-video" aria-selected="false">동영상</button>
                    　　　　　　　　　　　　　　　　
                </div>
            </nav>

            {/* 탭 내용 */}
            <div class="tab-content" id="myTab-content">
                <div class="tab-pane fade show active" id="nav-post" role="tabpanel" aria-labelledby="nav-post-tab">게시물</div>
                <div class="tab-pane fade" id="nav-picture" role="tabpanel" aria-labelledby="nav-picture-tab">사진</div>
                <div class="tab-pane fade" id="nav-video" role="tabpanel" aria-labelledby="nav-video-tab">동영상</div>
            </div>

            {/* 탭 활성화 */}
            {/* <script>
                var triggerEl = document.querySelector('#myTab button[data-bs-target="#nav-post"]')
                bootstrap.Tab.getInstance(triggerEl).show()

                var triggerEl = document.querySelector('#myTab button[data-bs-target="#nav-picture"]')
                bootstrap.Tab.getInstance(triggerEl).show()

                var triggerEl = document.querySelector('#myTab button[data-bs-target="#nav-video"]')
                bootstrap.Tab.getInstance(triggerEl).show()

                var triggerTabList = [].slice.call(document.querySelectorAll('#myTab button'))
                triggerTabList.forEach(function (triggerEl) {
                    var tabTrigger =new bootstrap.Tab(triggerEl)

                    triggerEl.addEventListener('click', function (event) {
                        Event.preventDefault(),
                        tabTrigger.show()
                    })
                })
            </script> */}
        </div>
    );
}

export default MemoryWrite;