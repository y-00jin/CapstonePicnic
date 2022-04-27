import React from 'react';
import { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Capstone/picnic-front/src/sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import Post from './TabContents/Post';
import Photo from './TabContents/Photo';
import Video from './TabContents/Video';


const obj = {
    0: <Post/>,
    1: <Photo />,
    2: <Video />,
};
  
const arr = ["First", "Second", "Third"];
  
{arr.map((str, idx) => {
              return (
                <li key={str} onClick={() => this.clickHandler(idx)}>
                  {str}
                </li>
              );
            })}

export default class Memory extends Component {
    state = {
      activeId: 0,
    };
  
    clickHandler = (id) => {
      this.setState({ activeId: id });
    };
  
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
            <h3>여행 기록</h3>
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
            <input type="text" readonly class="form-control" id="place" value="강릉 경포해변"/>
        </div>
        <p/>

        <div class="input-group input-group-lg">
            <span class="input-group-text">여행 기록</span>
            <textarea readonly class="form-control" aria-label="record" value=
            "바다가 예뻤다!"
            ></textarea>
        </div>
        <p>　</p>

   
        {/* 탭 버튼 활성화 */}
        <div className="wrapper">
          <ul class="nav justify-content-center">
            <li class="Memory-button" onClick={() => this.clickHandler(0)}>게시물　　</li>
            <li class="Memory-button" onClick={() => this.clickHandler(1)}>사진　　</li>
            <li class="Memory-button" onClick={() => this.clickHandler(2)}>동영상　　</li>
          </ul>
          <p/>
          <div className="contents">{obj[this.state.activeId]}</div>
        </div>

        {/* 버튼 */}
        <div className="btn-background">
        <Link to="/MemoryWrite">
          <button className="btn btn-color">수정</button>
        </Link>
        <h1>　</h1>
        <Link to="/Calendar">
          <button className="btn btn-color">삭제</button>
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
