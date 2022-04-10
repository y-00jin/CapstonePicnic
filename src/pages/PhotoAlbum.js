import React from "react";
import { Link } from "react-router-dom";
import '../resoure/css/Header.css'
import '../resoure/css/PhotoAlbum.css'


function PhotoAlbum() {

    return (

        <div className="container">
            <p />
            <hr className="hr" />
            <div className="title">
                <Link to="/Calendar">
                    <button className="title-btn">＜</button>
                </Link>
                <h3>사진첩</h3>
                <h3></h3>

            </div>


            <hr className="hr" />

        </div>

    );
}

export default PhotoAlbum;