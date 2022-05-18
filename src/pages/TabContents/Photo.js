import { Link } from "react-router-dom";
import 'C:/Capstone/picnic-front/src/resoure/css/Tab.css'

import img1 from 'C:/Capstone/picnic-front/src/resoure/image/1.jpg';
import img2 from 'C:/Capstone/picnic-front/src/resoure/image/2.jpg';
import img3 from 'C:/Capstone/picnic-front/src/resoure/image/3.jpg';

function Photo() {
    return(
        <div class="tab-photo-layout">
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_01" src={img1} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_02" src={img2} /></button>
            <button className="tab-button" type="button"><img className="tab-phone-image" alt="iPhone_03" src={img3} /></button>
        </div>
    )
}

export default Photo;