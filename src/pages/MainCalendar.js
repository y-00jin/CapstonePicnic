import React from "react";
import '../resoure/css/MainCalendar.css'
import Calendar from './components/Calendar'

class MainCalendar extends React.Component {
    render() {
        return (
            <div className="MC-App">


                {/* 상단 타이틀*/}
                <header className="MC-title-header">
                    <hr className="MC-hr" />
                    <div className="MC-title">
                        <h3> </h3>
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