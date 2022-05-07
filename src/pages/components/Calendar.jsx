import React from "react";
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

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    renderHeader() {
        const dateFormat = "yyyy 년 MM 월";
        return (
            <div className="header row flex-middle">
                <div className="toDay">
                    <button onClick={this.today}>오늘</button>
                </div>
                <div className="col col-start">

                    
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
                <div className="photo">
                    <button>사진첩</button>
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

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(toDate(cloneDay))}>
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
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

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
        // console.log(this.state.currentMonth.getFullYear()+"."+(this.state.currentMonth.getMonth()+1)+"."+this.state.selectedDate.getDate());
        //  alert(this.state.selectedDate.getDate());
        console.log(this.state.currentMonth.getFullYear()+"."+(this.state.currentMonth.getMonth()+1)+"."+this.state.selectedDate.getDate());
    };

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
    
    render() {
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