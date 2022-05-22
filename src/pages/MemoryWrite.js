import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Capstone/picnic-front/src/sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import '../resoure/css/Tab.css'

import add from 'C:/Capstone/picnic-front/src/resoure/image/add.jpg'
// import remove from 'C:/Capstone/picnic-front/src/resoure/image/remove.png';

const MemoryWrite = props => {
  const [ photoToAddList, setPhotoToAddList ] = useState([]);

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
      hiddenFileInput.current.click();
  };

  const handlePhoto = (e) => {
      const temp = []
      const photoToAdd = e.target.files;
  
      for (let i = 0; i < photoToAdd.length; i++) {
          temp.push({ id: photoToAdd[i].name, file: photoToAdd[i], url: URL.createObjectURL(photoToAdd[i]) })
      };
      
      setPhotoToAddList(temp.concat(photoToAddList)) //사진을 여러 번 나눠서 등록할 때, 더 나중에 등록한 사진이 더 앞 순서에 나타나도록 함
  };

  const onRemoveToAdd = (deleteUrl) => {
      setPhotoToAddList(photoToAddList.filter(photo => photo.url !== deleteUrl))
  }
  
  const photoToAddPreview = () => {
      return photoToAddList.map((photo) => {
          return (        
              <div className="add-container" key={photo.url}>
                  {/* <button className="photoBoxDelete" type="button" onClick={()=>onRemoveToAdd(photo.url)}><img src={remove} /></button> */}
                  <button className="remove" type="button" onClick={()=>onRemoveToAdd(photo.url)}>❌</button>
                  <img className="tab-phone-image" src={photo.url} />
              </div>
          )
      })
  };

  const savePhoto = () => {
      return (
          console.log("저장!")
      )
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
        <input type="text" readonly class="form-control" id="date" defaultValue={"2022-04-27"}/>
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


    <div id="addPost"><h4>| 추억 추가</h4></div>

    <p/>
    
    <div class="tab-photo-layout">
      <div className="photoBox addPhoto">
        <button className="add-button" type="button" onClick={handleClick}><img className="tab-phone-image" alt="add" src={add} /></button>
        <input 
          type="file" 
          accept="image/jpg, image/jpeg, image/png" 
          multiple 
          ref={hiddenFileInput}
          onChange={(e) => handlePhoto(e)}
          style={{display: 'none'}} 
        />
      </div>
      { photoToAddPreview() }
    </div>

    {/* 버튼 */}
    <div className="btn-background">
    <Link to="/Memory">
      <button className="btn btn-color">저장</button>
    </Link>
    <h1>　</h1>
    <Link to="/MainCalendar">
      <button className="btn btn-color">취소</button>
    </Link>
    </div>
    </div>
  );
}

export default MemoryWrite;
