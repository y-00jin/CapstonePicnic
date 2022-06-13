import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import '../resoure/css/Tab.css'

import FileUpload from './components/FileUpload.js';

// const GetValues = () => {

//   const inputPlace = document.getElementById('place');
//   console.log(inputPlace + "입니다")
//   localStorage.setItem('place', inputPlace.value)

//   const inputRecord = document.getElementById('record');
//   localStorage.setItem('record', inputRecord.value)
// }

const MemoryWrite = () => {

  var date = ''

  if(localStorage.getItem('date')){
    date = localStorage.getItem('date')
  }

  return (
    <div class="container">

    {/* 타이틀 바 */}
    <p/>
    <hr className="hr" />
    <div className="title">
        <Link to="/MainCalendar">
            <button className="title-btn">＜</button>
        </Link>
        <h3>추억 쓰기</h3>
        <h3></h3>
    </div>
    <hr className="hr" />

    {/* 여행 기록 부분 */}
    <p/>
    <div class="input-group input-group-lg">
        <span class="input-group-text" id="basic-addon1">여행 날짜</span>
        <input type="text" readonly class="form-control" id="date" value={date}/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text" id="basic-addon1">여행 장소</span>
        <input type="text" className="form-control" aria-label="place" aria-describedby="basic-addon1" id="place"/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text">여행 기록</span>
        <textarea class="form-control" aria-label="record" id="record"></textarea>
    </div>
    <p>　</p>


    <div id="addPost"><h4>| 추억 추가</h4></div>

    <p/>
    <FileUpload />
    </div>
  );
}

export default MemoryWrite;
