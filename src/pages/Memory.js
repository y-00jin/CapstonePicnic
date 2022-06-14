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

let file
let photoArray = [];
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

  state = {
    date: localStorage.getItem('date'),
    sessionId: localStorage.getItem('sessionId'),
    results: {},
    time: 0,
    memoryIdx: '',
    place: '',
    record: '',
    check: false,
    check2: false,
    fileList: [],
    fileArray: [],
    modalOpen: false,
    memberList: [],
    divMemory: []
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
      this.getMemoryIdx()
      this.getPlace()
      this.getRecord()
      this.getFile()
    }
  }

  getMemoryIdx = () => {
    this.setState({memoryIdx: this.state.results[0].memory_idx})
    console.log('memoryIdx는 ' + this.state.memoryIdx)
  }

  getPlace = () => {
    this.setState({place: this.state.results[0].title})
  }

  getRecord = () => {
    this.setState({record: this.state.results[0].contents})
  }

  getFile = async() => {
    if(this.state.check2 === false && this.state.memoryIdx !== '') {
      console.log('이것도 된다!')
      this.setState({check2: true})
      
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

      if(fileList.length !== 0) {
        fileList.map((el, key) => {   // 아이디 검색
          this.state.fileArray.push(el.file_name);
        })
        console.log("d"+this.state.fileArray);
        // localStorage.setItem("fileArray", this.state.fileArray);
        photoArray = this.state.fileArray;
      } else {
        console.log("못찾음");
      }
    }

    this.putButton();
      
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

putButton = () => {
  console.log('풋버튼')
  file = require("C:/Capstone/picnic-front/src/uploads/" + photoArray[0])
  console.log(URL.createObjectURL(file))
    for(let i = 0; i < photoArray.length; i++) {
        const file = require("C:/Capstone/picnic-front/src/uploads/" + photoArray[i])
        console.log("C:/Capstone/picnic-front/src/uploads/" + photoArray[i])
        const divMemory = this.state.divMemory;
        divMemory.push(
            <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_01" src={file} /></button>
        )
    }
    return <divMemory/>;
  }
  
  render() {
    this.searchMemory();
    this.getFile();
    // this.putButton();

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
        <input type="text" readonly class="form-control" id="date" value={this.state.date}/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text" id="basic-addon1">여행 장소</span>
        <input type="text" readonly class="form-control" id="place" value={this.state.place}/>
    </div>
    <p/>

    <div class="input-group input-group-lg">
        <span class="input-group-text">여행 기록</span>
        <textarea readonly class="form-control" aria-label="record" value={this.state.record}></textarea>
    </div>
    <p>　</p>

    <button id="btnPhoto" onClick={this.getFile}><h4>| 추억 사진</h4></button>
    {/* {photoArray.length = 0 ? <Post fileArray={photoArray}/> : null} */}
    <div className="tab-photo-layout">
            <React.Fragment>
                {/* <putButton/> */}
                {/* {this.state.divMemory} */}
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_01" src={file} /></button>
                {/* <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_02" src={img2} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_03" src={img3} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_04" src={img4} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_05" src={img5} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_06" src={img6} /></button> */}
                    <ModalDetails open={this.state.modalOpen} close={this.closeModal}>
                        <ImageGallery items={images}/>
                    </ModalDetails>
            </React.Fragment>
            </div>

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
