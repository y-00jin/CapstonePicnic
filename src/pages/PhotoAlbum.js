import React from "react";
import { Link } from "react-router-dom";
import '../resoure/css/PhotoAlbum.css'


function PhotoAlbum() {

    return (

        <div className="PhotoAlbum">

        
            <hr className="hr" />
            <div className="header-title">

                <Link to="/Calendar">
                    <button>＜</button>
                </Link>


                <h2>사진첩</h2>
                <h2></h2>


            </div>


            <hr className="hr" />


        </div>

    );
}

export default PhotoAlbum;