import React from "react";
import { Link } from "react-router-dom";
import '../resoure/css/MainCalendar.css'
import Calendar from './components/Calendar'

class MainCalendar extends React.Component {
    render() {
        return (
            <div className="MC-App">


                {/* 상단 타이틀*/}


                <header className="MC-header">
                    <div className="MC-title">
                        <h3> </h3>
                        <h3>너, 나들이</h3>
                        <h3> </h3>
                    </div>
                </header>
                <main className="MC-main">
                    <Calendar />
                </main>




                {/* <p>
                    <Link to="/PhotoAlbum">
                        <br />
                        <button className="Main-btn Main-btn-color">사진첩</button>
                    </Link>

                </p>
                <p>
                    <Link to="/Memory">
                        <button className="Main-btn Main-btn-color">추억보기</button>
                    </Link>


                </p> */}

            </div>

        );
    }
}

export default MainCalendar;