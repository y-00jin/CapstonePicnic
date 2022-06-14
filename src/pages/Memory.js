import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import '../resoure/css/Tab.css'
import Post from './TabContents/Post';

class Memory extends Component {

  state = {
    date: localStorage.getItem('date'),
    sessionId: localStorage.getItem('sessionId'),
    results: {},
    time: 0,
    place: '',
    record: '',
    check: false
  };

  // useEffect(() => {
  //   setDate(localStorage.getItem('date'))
  //   setSessionId(localStorage.getItem('sessionId'))
  //   timeOut()
  //   if(time === 1) {
  //     searchMemory()
  //   }
  // }, [time])

  // timeOut = () => {
  //   setTimeout(setTime(1), 2000);
    
  //   console.log(date)
  //   console.log(sessionId)
  //   console.log('time out')
  // }

  searchMemory = async() => {
    // console.log('안된다!')
    // console.log(this.state.check)
    if (this.state.check === false) {
      console.log('된다!')
      this.setState({check: true})
      const res = await axios('/api/searchMemory', {
        method: 'POST',
        data: { 
            'search_memory_date': this.state.date,
            'creator_id': this.state.sessionId
        },
        headers: new Headers()
      });
  
      this.setState({results: res.data})
  
      if(this.state.results[0]?.memory_idx !== '') {
        console.log('not null')
        const result = this.state.results[0].memory_idx
        console.log(result)
      }
      
      console.log(this.state.date)
      console.log(this.state.sessionId)
      this.getPlace()
      this.getRecord()
    }
  }

  getPlace = async() => {
    this.setState({place: this.state.results[0].title})
  }

  getRecord = async() => {
    this.setState({record: this.state.results[0].contents})
  }
  
  render() {
    this.searchMemory();
  return (
    <div class="container">
    {/* 타이틀 바 */}
    <p/>
    <hr className="hr" />
    <div className="title">
        <Link to="/MainCalendar">
            <button className="title-btn">＜</button>
        </Link>
        <h3>추억 보기</h3>
        <h3> </h3>
    </div>
    <hr className="hr" />

    {/* 여행 기록 부분 */}
    <p/>
    <div class="input-group input-group-lg">
        <span class="input-group-text" id="basic-addon1">여행 날짜</span>
        <input type="text" readonly class="form-control" id="date" defaultValue={this.state.date}/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text" id="basic-addon1">여행 장소</span>
        <input type="text" readonly class="form-control" id="place" defaultValue={this.state.place}/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text">여행 기록</span>
        <textarea readonly class="form-control" aria-label="record" defaultValue={this.state.record}></textarea>
    </div>
    <p>　</p>

   
    {/* 탭 버튼 활성화 */}
    <div id="addPost"><h4>| 추억 사진</h4></div>
    <Post/>

    {/* 버튼 */}
    <div className="btn-background">
    <Link to="/MemoryWrite">
      <button className="btn btn-color">수정</button>
    </Link>
    <h1>　</h1>
    <Link to="/MainCalendar">
      <button className="btn btn-color">삭제</button>
    </Link>
    <h1>　</h1>
    <Link to="/MainCalendar">
      <button className="btn btn-color">취소</button>
    </Link>
    </div>
    </div>
  )
  }
  }
  export default Memory;
