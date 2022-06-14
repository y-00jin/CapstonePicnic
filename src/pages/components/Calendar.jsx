import React, { Component, useEffect } from "react";
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
import axios from 'axios';

import img from "../../resoure/image/1.jpg"
import { getMonth, parseISO } from "date-fns";


class Calendar extends Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        memoryList: [],
        check: false,
        array: [],
        array2: []
    };

 /* 달력 페이지가 시작됬을때 처리 */
    calendarLoad = async () => {
        const check = this.state.check;



        if (check === false) {
            this.setState(
                {
                    check: true
                }
            )
            const sessionId = window.localStorage.getItem("sessionId");
            const getCurMonth = this.state.currentMonth.toISOString().slice(5, 7);
            // const getCurMonth = addMonths(this.state.currentMonth, 1).toISOString().slice(5, 7);

           const array = this.state.array;
            console.log(sessionId + "     " + getCurMonth);
            if (array.length !== null) {
                const arrayNum = array.length;
                for (let i = 0; i < arrayNum; i++) {
                    array.pop();
                }
            }





            const res = await axios('/api/getMemoryDate', {
                method: 'POST',
                data: {
                    'sessionId': sessionId
                    // 'getCurMonth': getCurMonth
                },
                headers: new Headers()
            });
            this.setState({
                memoryList: res.data
            })
            const { memoryList } = this.state;



 memoryList.length !== 0 ?
                memoryList.map((el, key) => {   // 아이디 검색
                    if (el.memory_date.slice(5, 7) === getCurMonth) {
                        this.state.array.push(el.memory_date.slice(8, 10));
                        console.log(getCurMonth + "월에 저장된 추억 날짜 : " + el.memory_date.slice(8, 10));
                    } else {
                        console.log(getCurMonth + "월에 저장 되지 않은 추억 날짜 : " + el.memory_date.slice(8, 10));
                    }
                }) : console.log("못찾음");

           console.log(this.state.array);
            // for (let i = 0; i < this.state.array.length; i++) {
            //     if (this.state.array[i].slice(0, 1) === "0") {
            //         console.log("dd");
            //         this.state.array2.push(array[i].slice(1,2));
                    
            //     }
            //     if (this.state.array[i].slice(0, 1) !== "0") {
            //         this.state.array2.push(array[i])
                    
            //     }
            // }
            // console.log("array2 : " + this.state.array2);

            const file = require("../../resoure/image/1.jpg");
            console.log(file);

           for(let i=0;i<this.state.array.length;i++){
                let test = document.getElementById(this.state.array[i]);
                // test.style.background = '#FAF4C0';
                // test.style.height = '100px'
                // test.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/7625/7625438.png')" ;
                test.style.backgroundImage = "url('" + file + "')" ;
                test.style.backgroundSize = "130px";
                test.style.backgroundPositionX = 'center';
                test.style.backgroundPositionY = 'center';
                test.style.backgroundorigin = "padding-box";
                test.style.backgroundRepeat = "no-repeat"
           
            }
        }
    };

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
        var year = day.getFullYear();
        var month = day.getMonth() + 1;
        var day = day.getDate();
        var date = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2)); // 2022-06-13 포맷으로 출력
        // var date = (day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate());
        // console.log("date : " + date);
        localStorage.setItem('date', date);
        
        let dayId = document.getElementById(("00" + day.toString()).slice(-2));
        
        
        console.log("잉"+dayId.style.backgroundImage);


        if(dayId.style.backgroundImage === ""){
            window.location.href = 'http://localhost:3000/MemoryWrite';
        }else{
            window.location.href = 'http://localhost:3000/Memory';
        }
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
        // this.calendarLoad();
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
        // const sessionArray = window.localStorage.getItem("sessionArray");
        // console.log("ARRAY"+sessionArray);
        const rows = [];
        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "dd";



        let days = [];
        let day = startDate;
        let formattedDate = "";
        let num = [4, 7, 9, 15, 26];
        let numCount = 0;
        
        // console.log(props[numCount]);
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                // console.log("dd" + day.getDate() + " ddd" + props[numCount]);

                // 사진으로 배경 설정
                // if (day.getDate() === num[numCount]) {
                //     days.push(
                //         <div
                //             className={`col cell ${!isSameMonth(day, monthStart)
                //                 ? "disabled"
                //                 : isSameDay(day, selectedDate) ? "selected" : ""
                //                 }`}
                //             key={day}
                //             onClick={() => this.onDateClick(toDate(cloneDay))}>
                //             <Link to="/Memory" className="link-btn">
                //                 <span className="photo-bg"><img className="phone-image" alt="iPhone_01" src={img} /></span>
                //                 <span className="photo-number">{formattedDate}</span>
                //             </Link>


                //         </div>
                //     );
                //     numCount++;
                // }
                // else {
                days.push(
                    <div
                        className={`col cell ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        id={formattedDate}
                        key={day}
                        onClick={() => this.onDateClick(toDate(cloneDay))}>

                       {/* <Link to={ ? '/MemoryWrite' : '/Memory'} className="link-btn"> */}
                            <span className="number">{formattedDate}</span>
                            {/* <span className="bg">{formattedDate}</span> */}
                        {/* </Link> */}
                    </div>
                );
                // }
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
            currentMonth: addMonths(this.state.currentMonth, 1),
            check: false
        });
        // this.calendarLoad();
    };


   /* 이전달 */
    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1),
            check: false
        });
    };
    /* 오늘 버튼 */
    today = () => {
        this.setState({
            currentMonth: new Date(),
            selectedDate: new Date(),
            check: false
        });
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