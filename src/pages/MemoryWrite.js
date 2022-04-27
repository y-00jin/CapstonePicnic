import React from 'react';
import { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Capstone/picnic-front/src/sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import 'C:/Capstone/picnic-front/src/resoure/css/PhotoAlbum.css'

import add from 'C:/Capstone/picnic-front/src/resoure/image/add.jpg'
import img1 from 'C:/Capstone/picnic-front/src/resoure/image/1.jpg';
import img2 from 'C:/Capstone/picnic-front/src/resoure/image/2.jpg';
import img3 from 'C:/Capstone/picnic-front/src/resoure/image/3.jpg';
import img4 from 'C:/Capstone/picnic-front/src/resoure/image/4.jpg';
import img5 from 'C:/Capstone/picnic-front/src/resoure/image/5.jpg';
import img6 from 'C:/Capstone/picnic-front/src/resoure/image/6.jpg';

// const obj = {
//     0: <Post/>,
//     1: <Photo />,
//     2: <Video />,
// };
  
// const arr = ["First", "Second", "Third"];
  
// {arr.map((str, idx) => {
//               return (
//                 <li key={str} onClick={() => this.clickHandler(idx)}>
//                   {str}
//                 </li>
//               );
//             })}

export default class MemoryWrite extends Component {
    // state = {
    //   activeId: 0,
    // };
  
    // clickHandler = (id) => {
    //   this.setState({ activeId: id });
    // };
  
    render() {
      return (
        <div class="container">

        {/* 타이틀 바 */}
        <p/>
        <hr className="hr" />
        <div className="title">
            <Link to="/Calendar">
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
            <input type="text" readonly class="form-control" id="date" value="2022-04-27"/>
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

   
        <div id="addPost"><h4>| 추억추가</h4></div>

        <p/>
        
        <div class="photo-layout">
            <img className="phone-image" alt="iPhone_00" src={add} />
            <img className="phone-image" alt="iPhone_01" src={img1} />
            <img className="phone-image" alt="iPhone_02" src={img2} />
            <img className="phone-image" alt="iPhone_03" src={img3} />
            <img className="phone-image" alt="iPhone_04" src={img4} />
            <img className="phone-image" alt="iPhone_05" src={img5} />
            <img className="phone-image" alt="iPhone_06" src={img6} />  
        </div>

        {/* 버튼 */}
        <div className="btn-background">
        <Link to="/Memory">
          <button className="btn btn-color">저장</button>
        </Link>
        <h1>　</h1>
        <Link to="/Calendar">
          <button className="btn btn-color">취소</button>
        </Link>
        </div>
        </div>
      );
    }
  }
