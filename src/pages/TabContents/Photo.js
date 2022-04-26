import 'C:/Capstone/picnic-front/src/resoure/css/PhotoAlbum.css'

import img1 from 'C:/Capstone/picnic-front/src/resoure/image/1.jpg';
import img2 from 'C:/Capstone/picnic-front/src/resoure/image/2.jpg';
import img3 from 'C:/Capstone/picnic-front/src/resoure/image/3.jpg';

function Photo() {
    return(
        <div class="photo-layout">
            <img className="phone-image" alt="iPhone_01" src={img1} />
            <img className="phone-image" alt="iPhone_02" src={img2} />
            <img className="phone-image" alt="iPhone_03" src={img3} />
        </div>
    )
}

export default Photo;