import React from "react";
import '../resoure/css/MainCalendar.css'
import Calendar from './components/Calendar'
import { Link } from "react-router-dom";

class MainCalendar extends React.Component {

    _removeSession(){   // 뒤로가기 클릭 시 세션 지우기
        window.localStorage.removeItem("sessionId");
    }
    render() {
        return (
            <div className="MC-App">


                {/* 상단 타이틀*/}
                <header className="MC-title-header">
                    <hr className="MC-hr" />
                    <div className="MC-title">
                        <Link to="/">
                            <button className="MC-title-btn" onClick={this._removeSession}>＜</button>
                        </Link>
                        <h3>너, 나들이</h3>
                        <h3> </h3>
                    </div>
                    <hr className="MC-hr" />
                    <p />
                </header>


                <main className="MC-main">
                    <Calendar />
                </main>

            </div>

        );
    }
}

export default MainCalendar;