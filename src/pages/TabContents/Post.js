import React from 'react';
import 'C:/Capstone/picnic-front/src/resoure/css/Tab.css'
import ModalDetails from "./ModalDetails";
import ImageGallery from 'react-image-gallery';

import img1 from '../../resoure/image/1.jpg';
import img2 from '../../resoure/image/2.jpg';
import img3 from '../../resoure/image/3.jpg';
import img4 from '../../resoure/image/4.jpg';
import img5 from '../../resoure/image/5.jpg';
import img6 from '../../resoure/image/6.jpg';

import { Component } from "react";

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

//   const url1 = URL.createObjectURL(img1)

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            name: '',
            id: '',
            password: '',
            password2: '',
            memberList: []
        }
    };

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

    render() {
        return(
            <div className="tab-photo-layout">
            <React.Fragment>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_01" src={img1} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_02" src={img2} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_03" src={img3} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_04" src={img4} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_05" src={img5} /></button>
                <button className="tab-button" type="button" onClick={this.openDetails}><img className="tab-phone-image" alt="iPhone_06" src={img6} /></button>
                    <ModalDetails open={this.state.modalOpen} close={this.closeModal}>
                        <ImageGallery items={images}/>
                    </ModalDetails>
            </React.Fragment>
            </div>
        )
    }
}

export default Post;