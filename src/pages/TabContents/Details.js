import React from 'react';
import ImageGallery from 'react-image-gallery';

let file = Object
let image = window.localStorage.getItem('fileArray') + ""
console.log(image)
let imageArray = image.split(",");
console.log(imageArray);
let photoArray = [];
let images = []

// console.log(photoArray)
images = [
  {
    original: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[0]),
    thumbnail: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[0]),
  },
  {
    original: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[1]),
    thumbnail: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[1]),
  },
  // {
  //   original: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[2]),
  //   thumbnail: require("C:/Capstone/picnic-front/src/uploads/" + imageArray[2]),
  // },
  // {
  //   original: 'https://picsum.photos/id/1019/1000/600/',
  //   thumbnail: 'https://picsum.photos/id/1019/250/150/',
  // },
];

// const MyGallery = () => {
//     return(
//       <ImageGallery items={images} />
//     )
// }

class MyGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        check: false
    }
  };

  setFile() {
    if (this.state.check === false) {
      photoArray = [];
      for(let i = 0; i < imageArray.length; i++) {
        file = require("C:/Capstone/picnic-front/src/uploads/" + imageArray[i])
        console.log(file)
        photoArray.push('{ original: '+file+', thumbnail: '+file+', },')
        console.log(photoArray)
        console.log(images)
      }

      this.setState({check: true})
    }
  }

  render() {
    // this.setFile();
    return (
    <ImageGallery items={images} />
    )
  }
}

export default MyGallery;