import React, {Component} from "react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import toDate from "date-fns/toDate";
import { Link } from "react-router-dom";
// import axios from 'axios';

import img from "../../resoure/image/1.jpg"

class Calendar extends Component {

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
        <form action="./MemoryWrite" method="post">


        </form>
        console.log(day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate());
    };
    
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        // id:'test1',
        // memoryList:[],
    };

    // id로 데이터조회
    // _getDate = async () => {
    //     const { id, currentMonth } = this.state;
    //     const res = await axios('/api/getDate', {
    //         method: 'POST',
    //         data: {
    //             'id': this.state.id,
    //             'memory_date': (this.state.selectedDate.getMonth+1)
    //         },
    //         headers: new Headers()
    //     });
    //     this.setState({
    //         memberList: res.data
    //     })
    //     const { memoryList } = this.state;

    //     memoryList.length !== 0 ?
    //     memoryList.map((el, key) => {
    //         {el.memory_date}
    //     }) :<h1></h1>;

    // }

    
    renderHeader() {
        const dateFormat = "yyyy 년 MM 월";
        return (
            <div>
                <div className="MC-header-btn header">
                    <button className="MC-btn MC-btn-color MC-btn-today" onClick={this.today}>오늘</button>

                    <div className="col">
                        <div className="icon" onClick={this.prevMonth}>
                            chevron_left
                        </div>
                    </div>
                    <div className="col">
                        <span>{format(this.state.currentMonth, dateFormat)}</span>
                    </div>
                    <div className="col" onClick={this.nextMonth}>
                        <div className="icon">chevron_right</div>
                    </div>
                    <Link to="/PhotoAlbum">
                        <br />
                        <button className="MC-btn MC-btn-color MC-btn-link">사진첩</button>
                    </Link>

                </div>
                {/* <div className="header row flex-middle">

                    
                    
                </div> */}
            </div>

        );
    }

    renderDays() {
        // const dateFormat = "d";
        const days = [];
        const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        // let startDate = startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {/* {format(addDays(startDate, i), dateFormat)} */}
                    {weekday[i]}
                </div>
            );
        }
        return <div className="days row">{days}</div>;

    }

    
    renderCelss() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "dd";
        const rows = [];
        
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let num =[4, 7, 9, 15, 26];
        let numCount = 0;


        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                
                    if(day.getDate() === num[numCount]){
                        days.push(
                            <div
                                className={`col cell ${!isSameMonth(day, monthStart)
                                    ? "disabled"
                                    : isSameDay(day, selectedDate) ? "selected" : ""
                                    }`}
                                    
                                key={day}
                                onClick={() => this.onDateClick(toDate(cloneDay))}>
                                    
                                <Link to= "/Memory" className="link-btn">
                                    <span className="photo-bg"><img className="phone-image" alt="iPhone_01" src={img} /></span>
                                    <span className="photo-number">{formattedDate}</span>
                                    
                                </Link>
                                
                                
                            </div>
                        );
                        numCount++;
                    }
                    else{
                    
                    days.push(
                        <div
                            className={`col cell ${!isSameMonth(day, monthStart)
                                ? "disabled"
                                : isSameDay(day, selectedDate) ? "selected" : ""
                                }`}
                                
                            key={day}
                            onClick={() => this.onDateClick(toDate(cloneDay))}>
                                
                            <Link to={{
                                pathname: '/MemoryWrite',
                                
                            }} className="link-btn">
                                <span className="number">{formattedDate}</span>
                                <span className="bg">{formattedDate}</span>
                            </Link>
                            
                            
                        </div>
                    );
                    }
                
                
                day = addDays(day, 1);  //시작날부터 1씩 증가하여 day에 저장
            }
            rows.push(
                <div className="row" key={day}>
                        {days}
                </div>
            );
            days = [];

        }
        return <div className="body">{rows}</div>;

    }

    /* 다음달 */
    nextMonth = () => {

        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    /* 이전달 */
    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    /* 오늘 버튼 */
    today = () => {

        this.setState({
            currentMonth: new Date(),
            selectedDate: new Date()
        });

    }


    /* 달력 페이지가 시작됬을때 처리 */
    calendarLoad(){
        
        const sessionId = window.localStorage.getItem("sessionId");
        const getCurMonth = this.state.currentMonth.getMonth() + 1;
        console.log( sessionId + "     " + getCurMonth);
    }


    render() {
        
        this.calendarLoad();
        
        return (
            

            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCelss()}
            </div>
        );
    }


}

export default Calendar;