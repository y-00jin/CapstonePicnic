import React from "react";
import { Link } from "react-router-dom";
import '../resoure/css/Calendar.css'


function Calendar() {

    return (
        <Link to="/PhotoAlbum">
            <button>사진첩</button>
        </Link>
    );
}

export default Calendar;