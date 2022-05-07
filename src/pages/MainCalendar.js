import React from "react";
import { Link } from "react-router-dom";
import '../resoure/css/Calendar.css'
import Calendar from './components/Calendar'

class MainCalendar extends React.Component {
    render() {
        return (
            <div className="container">
                <p>
                    <Link to="/PhotoAlbum">
                        <br />
                        <button className="Main-btn Main-btn-color">사진첩</button>
                    </Link>
                </p>
                <p>
                    <Link to="/Memory">
                        <button className="Main-btn Main-btn-color">추억보기</button>
                    </Link>
                </p>
            </div>
        );
    }
}

export default MainCalendar;