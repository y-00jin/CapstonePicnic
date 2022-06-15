import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import '../resoure/css/Tab.css'
import Post from './TabContents/Post';
import ModalDetails from "./TabContents/ModalDetails";
import ImageGallery from 'react-image-gallery';

// let file;
// let photoArray = [];
const images = [
  {
    original: 'https://i.ibb.co/pvtykb2/1.jpg',
    thumbnail: 'https://i.ibb.co/pvtykb2/1.jpg',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

class Memory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      date: localStorage.getItem('date'),
      sessionId: localStorage.getItem('sessionId'),
      memoryIdx: "",
      place: "",
      record: "",
      check: false,
      check2: false,
      fileList: [],
      fileArray: [],
      modalOpen: false,
      memoryList: [],
      divMemory: []

    }
  };


  putButton = (props) => {

    if (props === null) {

    }

    else {

      const divMemory = this.state.divMemory;
      if (divMemory.length !== null) {
        const divMemoryNum = divMemory.length;
        for (let i = 0; i < divMemoryNum; i++) {
          divMemory.pop();
        }
      }
      console.log('풋버튼' + props);


      for (let i = 0; i < props.length; i++) {

        const file = require("C:/Capstone/picnic-front/src/uploads/" + props[i])

        divMemory.push(
          <div>
            <Link to="/Details">
              <button className="tab-button" type="button" onClick={() => {window.localStorage.setItem('fileArray', props ); console.log(window.localStorage.getItem('fileArray'));}}><img className="tab-phone-image" alt="iPhone_01" src={file} /></button>
            </Link>
          </div>

          // <button className="tab-button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_01" src={file} ></img></button>
        )

        // console.log("C:/Capstone/picnic-front/src/uploads/" + this.state.fileArray[i])
      }
      console.log(this.state.divMemory[0]);

      return <divMemory />;

    }


    // console.log("완료");

    // console.log(this.state.divMemory[0]);

  }


  /*시작 */
  searchMemory = async () => {
    const check = this.state.check;

    if (check === false) {


      const fileArray = this.state.fileArray;
      if (fileArray.length !== null) {
        const fileArrayNum = fileArray.length;
        for (let i = 0; i < fileArrayNum; i++) {
          fileArray.pop();
        }
      }




      console.log('된다!')
      this.setState({ check: true })
      const res = await axios('/api/searchMemory', {
        method: 'POST',
        data: {
          'search_memory_date': this.state.date,
          'creator_id': this.state.sessionId
        },
        headers: new Headers()
      })

      this.setState({
        memoryList: res.data
      })

      // this.setState({ results: res.data })

      const { memoryList } = this.state;


      memoryList.length !== 0 ?
        memoryList.map((el, key) => {   // 아이디 검색

          this.setState({
            memoryIdx: el.memory_idx,
            place: el.title,
            record: el.contents
          })

        }) : console.log("없음")


      console.log("memoryIdx" + this.state.memoryIdx + "   " + this.state.place + "   " + this.state.record);


      // if (this.state.results[0]?.memory_idx !== '') {
      //   console.log('not null')
      //   const result = this.state.results[0].memory_idx
      //   console.log(result)
      // }

      // console.log(this.state.date)
      // console.log(this.state.sessionId)
      // this.getMemoryIdx()
      // this.getPlace()
      // this.getRecord()
      // this.getFile()


      const res2 = await axios('/api/getFileAtMemory', {
        method: 'POST',
        data: {
          'sessionId': this.state.sessionId,
          'memory_idx': this.state.memoryIdx
        },
        headers: new Headers()
      });
      this.setState({
        fileList: res2.data
      })


      const { fileList } = this.state;

      fileList.length !== 0 ?
        fileList.map((el, key) => {   // 아이디 검색
          fileArray.push(el.file_name);
        }) : console.log("못찾음");


      this.putButton(fileArray);


    }
  }

  // getMemoryIdx = () => {
  //   this.setState({ memoryIdx: this.state.results[0].memory_idx })
  //   console.log('memoryIdx는 ' + this.state.memoryIdx)
  // }

  // getPlace = () => {
  //   this.setState({ place: this.state.results[0].title })
  // }

  // getRecord = () => {
  //   this.setState({ record: this.state.results[0].contents })
  // }

  search = (props) => {
    this.getFile();

  }

  getFile = async () => {

    const fileArray = this.state.fileArray;
    if (fileArray.length !== null) {
      const fileArrayNum = fileArray.length;
      for (let i = 0; i < fileArrayNum; i++) {
        fileArray.pop();
      }
    }


    // if (this.state.check2 === false && this.state.memoryIdx !== '') {
    console.log('이것도 된다!')
    // this.setState({ check2: true })

    const res = await axios('/api/getFileAtMemory', {
      method: 'POST',
      data: {
        'sessionId': this.state.sessionId,
        'memory_idx': this.state.memoryIdx
      },
      headers: new Headers()
    })
    this.setState({
      fileList: res.data
    })

    const { fileList } = this.state;

    fileList.length !== 0 ?
      fileList.map((el, key) => {   // 아이디 검색
        fileArray.push(el.file_name);
      }) : console.log("못찾음")


    // if (fileList.length !== 0) {
    //   fileList.map((el, key) => {   // 아이디 검색
    //     fileArray.push(el.file_name);
    //   })
    //   console.log("d" + this.state.fileArray);
    //   // localStorage.setItem("fileArray", this.state.fileArray);
    //   // photoArray = this.state.fileArray;
    // } else {
    //   console.log("못찾음");
    // }
    // }

    this.putButton(fileArray);
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  openDetails = async () => {
    this.setState({ modalOpen: true })  // 모달창 열기
    // console.log(url1)
  }

  memoryDelete = async() => {
    const res = await axios('/api/memoryDelete', {
      method : 'POST',
      data: {
        'sessionId': this.state.sessionId,
        'memory_idx': this.state.memoryIdx
      },
      headers: new Headers()
    })
  }

  memoryUpdate = async() => {

    this.setState({
      place: document.getElementById('place').value,
      record: document.getElementById('record').value

    })

    console.log("th" + this.state.place );
    const res = await axios('/api/memoryUpdate', {
      method : 'POST',
      data : {
      'title': this.state.place,
      'contents': this.state.record,
      'search_memory_date': this.state.date,
      'creator_id': this.state.sessionId },
      headers: new Headers()
    })
  }

  render() {
    this.searchMemory();
    // this.getFile();
    // this.putButton();

    return (
      <div class="container">
        {/* 타이틀 바 */}
        <p />
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
        <p />
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="basic-addon1">여행 날짜</span>
          <input type="text" readonly class="form-control" id="date" value={this.state.date} />
        </div>
        <p />

        <div class="input-group input-group-lg">
          <span class="input-group-text" id="basic-addon1">여행 장소</span>
          <input type="text" class="form-control" id="place" defaultValue={this.state.place} />
        </div>
        <p />

        <div class="input-group input-group-lg">
          <span class="input-group-text">여행 기록</span>
          <textarea class="form-control" aria-label="record" id="record" defaultValue={this.state.record}></textarea>
        </div>
        <p>　</p>


        <div>
          <button className="btnPhoto" id="btnPhoto" onClick={this.search}><h4>| 추억 사진</h4></button>
        </div>


        <div className="tab-photo-layout">
          

          <React.Fragment>

          {this.state.divMemory}
          {/* <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_01" src={file} /></button> */}
          {/* <ModalDetails open={this.state.modalOpen} close={this.closeModal}>
              <ImageGallery items={images} />
            </ModalDetails>*/}
          </React.Fragment> 
        </div>

        {/* 버튼 */}
        <div className="btn-background">
          {/* <Link to="/MainCalendar">
            <button className="btn btn-color" onClick={() => {this.setState({record: document.getElementById('record').value, contents:document.getElementById('contents').value }); this.memoryUpdate()}}>수정</button>
          </Link> */}
          <h1>　</h1>
          <Link to="/MainCalendar">
            <button className="btn btn-color" onClick={this.memoryDelete}>삭제</button>
          </Link>
          <h1>　</h1>
          <Link to="/MainCalendar">
            <button className="btn btn-color">취소</button>
          </Link>
        </div>

      </div>


    );
  }
}
export default Memory;
