import React from 'react';
import ImageGallery from 'react-image-gallery';
// import 'http:localhost:3000/C:/Users/sharo/OneDrive/사진/캡스톤/1.jpg';

const images = [
  {
    original: 'blob:http://localhost:3000/7466a828-a6f2-4587-a795-715099e9cf4e',
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

class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={images} />;
  }
}

export default MyGallery;