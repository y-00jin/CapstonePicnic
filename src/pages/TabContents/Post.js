import { Link } from "react-router-dom";
import 'C:/Capstone/picnic-front/src/resoure/css/Tab.css'

import img1 from 'C:/Capstone/picnic-front/src/resoure/image/1.jpg';
import img2 from 'C:/Capstone/picnic-front/src/resoure/image/2.jpg';
import img3 from 'C:/Capstone/picnic-front/src/resoure/image/3.jpg';
import img4 from 'C:/Capstone/picnic-front/src/resoure/image/4.jpg';
import img5 from 'C:/Capstone/picnic-front/src/resoure/image/5.jpg';
import img6 from 'C:/Capstone/picnic-front/src/resoure/image/6.jpg';


function Post() {
    return(
        <div className="tab-photo-layout">
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_01" src={img1} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_02" src={img2} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_03" src={img3} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_04" src={img4} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_05" src={img5} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_06" src={img6} /></button>
        </div>
    )
}

export default Post;