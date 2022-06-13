import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Progress from './Progress';
import Message from './Message';

import add from '../../resoure/image/add.jpg'

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [ photoToAddList, setPhotoToAddList ] = useState([]);

  let photoToAdd = [];
  let files = [];
  const hiddenFileInput = React.useRef(null);
  const formData = new FormData();

  const handleClick = event => {
      hiddenFileInput.current.click();
  };

  const handlePhoto = (e) => {
      const temp = []
      photoToAdd = e.target.files;

      for (let i = 0; i < photoToAdd.length; i++) {
          temp.push({ id: photoToAdd[i].name, file: photoToAdd[i], url: URL.createObjectURL(photoToAdd[i]) })
          files.push(photoToAdd[i])
      };
      
      console.log(files)
      setPhotoToAddList(temp.concat(photoToAddList)) //사진을 여러 번 나눠서 등록할 때, 더 나중에 등록한 사진이 더 앞 순서에 나타나도록 함
      setFile(files.concat(file))

    //   console.log(photoToAddList);
  };

  const onRemoveToAdd = (deleteUrl) => {
      setPhotoToAddList(photoToAddList.filter(photo => photo.url !== deleteUrl))

      console.log(photoToAddList)
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

  const goReplace = () => {
    window.location.href = "http://localhost:3000/Memory"
    }

  const saveMemory = () => {
    if(localStorage.getItem('date') && localStorage.getItem('place') && localStorage.getItem('record')){
        const date = localStorage.getItem('date')
        const place = localStorage.getItem('place')
        const record = localStorage.getItem('record')
        const sessionId = window.localStorage.getItem("sessionId");

        console.log(date + " / " + place + " / " + record + " / " + sessionId)
      } else {
        console.log('없음')
      }
  }

  const onSubmit = async e => {
    e.preventDefault();

    console.log(file)

    for (let i = 0; i < file.length; i++) {
        formData.append('memory', file[i]);
    }

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

    //   console.log(res.data);

      setUploadedFile(res.data);

      setMessage('추억 저장!');
      saveMemory()
      goReplace()
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('서버에 문제가 생겼습니다');
      } else {
        setMessage(err.response.data.msg);
      }
    }
    };

  return (
    <div>
        {message ? <Message msg={message} /> : null}
        {/* <Progress percentage={uploadPercentage} /> */}
        <form onSubmit={onSubmit}>
        {/* <form action="/api/upload" id="post" method="post" enctype="multipart/form-data"> */}
        <div class="tab-photo-layout">
            <div className="photoBox addPhoto">
                <button className="add-button" type="button" onClick={handleClick}><img className="tab-phone-image" alt="add" src={add} /></button>
                <input 
                    type="file" 
                    name="memory"
                    accept="image/jpg, image/jpeg, image/png, video/*" 
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
            {/* <Link to="/Memory"> */}
                <button className="btn btn-color" type="submit" id="save">저장</button>
            {/* </Link> */}
        </div>
        </form>
    </div>
  );
};

export default FileUpload;
