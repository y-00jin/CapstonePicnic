import '../resoure/css/PhotoAlbum.css'

import img1 from '../resoure/image/1.jpg';
import img2 from '../resoure/image/2.jpg';
import img3 from '../resoure/image/3.jpg';
import img4 from '../resoure/image/4.jpg';
import img5 from '../resoure/image/5.jpg';
import img6 from '../resoure/image/6.jpg';

function Post() {
    return(
        <div class="photo-layout">
            <img className="phone-image" alt="iPhone_01" src={img1} />
            <img className="phone-image" alt="iPhone_02" src={img2} />
            <img className="phone-image" alt="iPhone_03" src={img3} />
            <img className="phone-image" alt="iPhone_04" src={img4} />
            <img className="phone-image" alt="iPhone_05" src={img5} />
            <img className="phone-image" alt="iPhone_06" src={img6} />  
        </div>
    )
}

export default Post;