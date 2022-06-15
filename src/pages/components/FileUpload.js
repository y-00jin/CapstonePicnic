import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Progress from './Progress';
import Message from './Message';

import add from '../../resoure/image/add.jpg'
import GetValues from './GetValues.js';

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [ memoryIdx, setMemoryIdx ] = useState({})
  const [ photoToAddList, setPhotoToAddList ] = useState([]);
  const [ count, setCount ] = useState(1);

  let memory_idx = ''
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

  const onRemoveToAdd = ( deleteUrl ) => {
      setPhotoToAddList(photoToAddList.filter(photo => photo.url !== deleteUrl))
      console.log(deleteUrl)
      console.log(photoToAddList)
  }
  
  const onRemoveToAdd2 = ( deleteName ) => {
    fileToAdd()
    setFile(file.filter(fileList => fileList.name !== deleteName))
  }

  const photoToAddPreview = () => {
      return photoToAddList.map((photo) => {

          return (        
              <div className="add-container" key={photo.url}>
                  {/* <button className="photoBoxDelete" type="button" onClick={()=>onRemoveToAdd(photo.url)}><img src={remove} /></button> */}
                  <button className="remove" type="button" onClick={() => {
                    onRemoveToAdd(photo.url);
                    onRemoveToAdd2(photo.id);
                  }}>❌</button>
                  <img className="tab-phone-image" src={photo.url} />
              </div>
          )
      })
  };

  const fileToAdd = () => {
    return file.map((fileList) => {
      return fileList.name;
    })
  }

  const goReplace = () => {
    window.location.href = "http://localhost:3000/Memory"
  }

  const saveFile = async() => {
    const date = localStorage.getItem('date')
    const sessionId = window.localStorage.getItem("sessionId");

    // memory_idx 받기
    const res = await axios('/api/searchMemory', {
      method: 'POST',
      data: {
          'search_memory_date': date,
          'creator_id': sessionId
      },
      headers: new Headers()
    });

    setMemoryIdx(res.data)
    
    if(memoryIdx !== null) {
      console.log("dd" + memoryIdx[0].memory_idx);
      memory_idx = '';
      // while(memory_idx === '') {
        memory_idx = memoryIdx[0].memory_idx;
        console.log(memoryIdx[0].memory_idx);
      // }
    } else {
      console.log('없음')
    }

    // 추억 저장(사진)
      for(let i = 0; i < file.length; i++) {
        const res2 = await axios('/api/fileUpload', {
          method: 'POST',
          data: {
              'original_name': file[i].name,
              'memory_idx': memory_idx,
              'file_seq': i + 1,
              'creator_id': sessionId,
              'memory_date': date,
          },
          headers: new Headers()
        });
      }

      setMessage('추억 저장!')

      setTimeout(() => goReplace(), 1000);
  }
  
  const saveMemory = async() => {

    GetValues()

    if(localStorage.getItem('date') && localStorage.getItem('place') && localStorage.getItem('record')){
        const date = localStorage.getItem('date')
        const place = localStorage.getItem('place')
        const record = localStorage.getItem('record')
        const sessionId = window.localStorage.getItem("sessionId");

        console.log(date + " / " + place + " / " + record + " / " + sessionId)

        // 추억 저장(텍스트)
        const res = await axios('/api/memoryWrite', {
          method: 'POST',
          data: {
              'title': place,
              'contents': record,
              'memory_date': date,
              'creator_id': sessionId,
              'search_memory_date': date,
          },
          headers: new Headers()
        })
      } else {
        console.log('없음')
      }
  }

  const onSubmit = async e => {
    console.log("1." + count)
    if( count === 1 ) {
      console.log("첫번째 클릭")
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
        saveMemory()
        const date = localStorage.getItem('date')
        const sessionId = window.localStorage.getItem("sessionId");

        // memory_idx 받기
        const res1 = await axios('/api/searchMemory', {
          method: 'POST',
          data: {
            'search_memory_date': date,
            'creator_id': sessionId
          },
          headers: new Headers()
        });

        setMemoryIdx(res1.data)
        setCount(2);
        console.log(count)
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('서버에 문제가 생겼습니다');
        } else {
          setMessage(err.response.data.msg);
        }
      }
    } else if( count === 2 ) {
      console.log("두번째 클릭")
      saveFile()
      setCount(0)
      console.log(count)
      // goReplace()
    }};

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
                <button className="btn btn-color" type="button" id="save" onClick={onSubmit}>저장</button>
            {/* </Link> */}
        </div>
        </form>
    </div>
  );
};

export default FileUpload;
