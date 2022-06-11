import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/custom.css/custom.css';
import '../resoure/css/Header.css'
import '../resoure/css/MemoryWrite.css';
import '../resoure/css/Tab.css'

import FileUpload from './components/FileUpload.js';

const MemoryWrite = props => {
  // const [ photoToAddList, setPhotoToAddList ] = useState([]);

  // const hiddenFileInput = React.useRef(null);

  // const handleClick = event => {
  //     hiddenFileInput.current.click();
  // };

  // const handlePhoto = (e) => {
  //     const temp = []
  //     const photoToAdd = e.target.files;

  //     for (let i = 0; i < photoToAdd.length; i++) {
  //         temp.push({ id: photoToAdd[i].name, file: photoToAdd[i], url: URL.createObjectURL(photoToAdd[i]) })
  //     };
      
  //     setPhotoToAddList(temp.concat(photoToAddList)) //사진을 여러 번 나눠서 등록할 때, 더 나중에 등록한 사진이 더 앞 순서에 나타나도록 함

  //   //   console.log(photoToAddList);
  // };

  // const onRemoveToAdd = (deleteUrl) => {
  //     setPhotoToAddList(photoToAddList.filter(photo => photo.url !== deleteUrl))

  //     console.log(photoToAddList)
  // }
  
  // const photoToAddPreview = () => {
  //     return photoToAddList.map((photo) => {

  //         return (        
  //             <div className="add-container" key={photo.url}>
  //                 {/* <button className="photoBoxDelete" type="button" onClick={()=>onRemoveToAdd(photo.url)}><img src={remove} /></button> */}
  //                 <button className="remove" type="button" onClick={()=>onRemoveToAdd(photo.url)}>❌</button>
  //                 <img className="tab-phone-image" src={photo.url} />
  //             </div>
  //         )
  //     })
  // };

  // const savePhoto = (e) => {

  //     console.log(photoToAddList)
  //     const formdata = new FormData();
  //     formdata.append('uploadImage', photoToAddList[0]);

  //     const config = {
  //         Headers: {
  //             'content-type': 'multiple/form-data',
  //         },
  //       };

  //       axios.post('api', formdata, config);
  //     }
    //   return (
    //       console.log("저장!")
    //   )
  

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
        {/* <input type="text" readonly class="form-control" id="date" defaultValue={"2022-04-27"}/> */}
        <input type="text" className="form-control" id="date" defaultValue={"2022-04-27"}/>
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
    <FileUpload />
    </div>
  );
}

export default MemoryWrite;
