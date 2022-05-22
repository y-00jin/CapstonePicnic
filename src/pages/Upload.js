import React from 'react';
import { useState, Row } from "react";
import add from 'C:/Capstone/picnic-front/src/resoure/image/add.jpg';
// import remove from 'C:/Capstone/picnic-front/src/resoure/image/remove.png';

const Upload = props => {
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
                <div className="photoBox" key={photo.url}>
                    {/* <button className="photoBoxDelete" type="button" onClick={()=>onRemoveToAdd(photo.url)}><img src={remove} /></button> */}
                    <img className="photoPreview" src={photo.url} />
                    <button type="button" onClick={()=>onRemoveToAdd(photo.url)}>❌</button>
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
        <>
            <div className="contentWrapper">
                <div className="contentBody photoUploaderWrapper">
                    <div className="photoUploaderContent">
                        <div className="photoBox addPhoto">
                            {/* <PlusOutlined /> */}
                            <button className="tab-button" type="button" onClick={handleClick}><img src={add} /></button>
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
                        {/* { photoAddedPreview() } */}
                    </div>
                </div>
                {/* <Row justify="center">
                    <button className="photoUploadComplete" onClick={ savePhoto }>기록하기</button>
                </Row> */}
            </div>
        </>
    );
}

export default Upload;