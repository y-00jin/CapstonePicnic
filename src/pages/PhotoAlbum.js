import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import '../resoure/css/Header.css'
import '../resoure/css/PhotoAlbum.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import format from "date-fns/format";

import img1 from '../resoure/image/1.jpg';
import img2 from '../resoure/image/2.jpg';
import img3 from '../resoure/image/3.jpg';
import img4 from '../resoure/image/4.jpg';
import img5 from '../resoure/image/5.jpg';
import img6 from '../resoure/image/6.jpg';
import searchImg from '../resoure/image/search.png';

import axios from 'axios';

class PhotoAlbum extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dateStart: null,
            dateEnd: null,
            memberList: [],
            searchList: [],
            check: false,
            memoryDates: [],
            memoryTitles: [],
            divMemory: []
        }


    };


    divMemoryLoad = (props, props2) => {

        // const divMemory = this.state.divMemory;
        const divMemory = this.state.divMemory;

        if (divMemory.length !== null) {
            const divMemoryNum = divMemory.length;
            for (let i = 0; i < divMemoryNum; i++) {
                divMemory.pop();
            }
        }
        // this.memoryLoad();

        // const memoryDates = props;
        console.log("memoryDates : " + props + props2);

        for (let i = 0; i < props.length; i++) {
            divMemory.push(
                <div class="photo-layout-block" key={i}>
                    <img className="phone-image" alt="iPhone_01" src={img1} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">{props[i]} {props2[i]}</button> </Link>
                </div>
            )
        }

        console.log("완료");

        return <div class="photo-layout"><divMemory/></div>;
        

    }


    /* 시작됬을때 데이터 검색 및 처리 */
    memoryLoad = async () => {
        const check = this.state.check;

        if (check === false) {


            const memoryDates = this.state.memoryDates;

            if (memoryDates.length !== null) {
                const memoryDatesNum = memoryDates.length;
                for (let i = 0; i < memoryDatesNum; i++) {
                    memoryDates.pop();
                }
            }

            const memoryTitles = this.state.memoryTitles;
            if (memoryTitles.length !== null) {
                const memoryTitlesNum = memoryTitles.length;
                for (let i = 0; i < memoryTitlesNum; i++) {
                    memoryTitles.pop();
                }
            }


            const sessionId = window.localStorage.getItem("sessionId");

            console.log("아이디 " + sessionId);
            this.setState(
                {
                    check: true
                }
            )
            const res = await axios('/api/getMemoryDate', {
                method: 'POST',
                data: {
                    'sessionId': sessionId
                    // 'getCurMonth': getCurMonth
                },
                headers: new Headers()
            });
            this.setState({
                searchList: res.data
            })

            const { searchList } = this.state;
            searchList.length !== 0 ?
                searchList.map((el, key) => {   // 아이디 검색

                    console.log(el.memory_date.slice(0, 10) + ", " + el.title);


                    // console.log("날짜 : " + el.memory_date.slice(0, 10));

                    memoryDates.push(el.memory_date.slice(0, 10));
                    memoryTitles.push(el.title);

                }) : console.log("없음")


            this.divMemoryLoad(memoryDates, memoryTitles);

        }

    };

    search = (props) => {
        this.searchMemoryLoad();
    }

    searchMemoryLoad = async () => {

        const memoryDates = this.state.memoryDates;

        if (memoryDates.length !== null) {
            const memoryDatesNum = memoryDates.length;
            for (let i = 0; i < memoryDatesNum; i++) {
                memoryDates.pop();
            }
        }

        const memoryTitles = this.state.memoryTitles;
        if (memoryTitles.length !== null) {
            const memoryTitlesNum = memoryTitles.length;
            for (let i = 0; i < memoryTitlesNum; i++) {
                memoryTitles.pop();
            }
        }

        const sessionId = window.localStorage.getItem("sessionId");
        const searchPlace = document.getElementById('searchPlace').value;

        let dateStart = this.state.dateStart;
        let dateEnd = this.state.dateEnd;

        // 모든 필드가 비어있으면 id로 추억 전체 검색
        if (searchPlace === '' && dateStart === null && dateEnd === null) {
            const res = await axios('/api/getMemoryDate', {
                method: 'POST',
                data: {
                    'sessionId': sessionId,
                },
                headers: new Headers()
            });
            this.setState({
                searchList: res.data
            })
        }

        // 날짜로만 검색
        if (searchPlace === '' && dateStart !== null && dateEnd !== null) {
            const res = await axios('/api/getMemorySearchNoTitle', {
                method: 'POST',
                data: {
                    'sessionId': sessionId,
                    'dateStart': dateStart,
                    'dateEnd': dateEnd
                },
                headers: new Headers()
            });
            this.setState({
                searchList: res.data
            })
        }

        // 장소로만 검색
        if (searchPlace !== null && dateStart === null && dateEnd === null) {
            const res = await axios('/api/getMemorySearchNoDate', {
                method: 'POST',
                data: {
                    'sessionId': sessionId,
                    'searchPlace': searchPlace
                },
                headers: new Headers()
            });
            this.setState({
                searchList: res.data
            })
        }

        // 장소 & 날짜로 검색
        if (searchPlace !== null && dateStart !== null && dateEnd !== null) {
            const res = await axios('/api/getMemorySearch', {
                method: 'POST',
                data: {
                    'sessionId': sessionId,
                    'searchPlace': searchPlace,
                    'dateStart': dateStart,
                    'dateEnd': dateEnd
                },
                headers: new Headers()
            });
            this.setState({
                searchList: res.data
            })
        }

        if ((dateStart !== null && dateEnd === null) || (dateStart === null && dateEnd !== null)) {
            alert('시작 날짜와 끝 날짜를 모두 채워주세요');
        }
        else {
            const { searchList } = this.state;

            searchList.length !== 0 ?
                searchList.map((el, key) => {   // 아이디 검색

                    console.log(el.memory_date.slice(0, 10) + ", " + el.title);
                    memoryDates.push(el.memory_date.slice(0, 10));
                    memoryTitles.push(el.title);

                }) : console.log("없음")

        }

        this.divMemoryLoad(memoryDates, memoryTitles);
    };



    render() {
        this.memoryLoad();
        
        return (

            <div className="container">

                {/* 상단 타이틀*/}
                <p />
                <hr className="hr" />
                <div className="title">
                    <Link to="/MainCalendar">
                        <button className="title-btn">＜</button>
                    </Link>
                    <h3>사진첩</h3>
                    <h3> </h3>
                </div>
                <hr className="hr" />

                <div className="div-search">
                    <div className="search-floating">

                        <input type="place" className="search-st" id="searchPlace" placeholder="검색할 장소 입력" />
                        <label htmlFor="search-st-label">장소</label>
                    </div>

                    <div className="search-datapicker">
                        <DatePicker className="datapicker-style"
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={this.state.dateStart}
                            selectsStart
                            onChange={(update) => {
                                this.setState({
                                    dateStart: update
                                })
                                // setDateRange(update);
                            }}

                            startDate={this.state.dateStart}
                            endDate={this.state.dateEnd}

                            withPortal
                            isClearable={true}
                            placeholderText="xxxx년 xx월 xx일"
                        />

                        <label htmlFor="datepicker-label">시작</label>
                    </div>


                    <div className="search-datapicker">
                        <DatePicker className="datapicker-style"
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={this.state.dateEnd}
                            selectsEnd
                            onChange={(update) => {
                                this.setState({
                                    dateEnd: update
                                })
                                // setDateRange(update);
                            }}

                            startDate={this.state.dateStart}
                            endDate={this.state.dateEnd}
                            minDate={this.state.dateStart}
                            withPortal
                            isClearable={true}
                            placeholderText="xxxx년 xx월 xx일"
                        />

                        <label htmlFor="datepicker-label">끝</label>
                    </div>

                    <div className="div-search-btn">

                        <button className="search-btn" id="search-btn" onClick={this.search}>
                            {/* <button className="search-btn" id="search-btn"> */}
                            <img className="search-image" alt="search" src={searchImg} />
                        </button>
                    </div>

                </div>


                <div id="memory-title"><h4>| 추억여행</h4></div>

                
                <div className="photo-layout" id="photo-layout-id">
                    {this.state.divMemory}

                    {/* <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_01" src={img1} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
                    </div>


                    <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_02" src={img2} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-2">2022.01.25 여수</button></Link>
                    </div>
                    <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_03" src={img3} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-3">2022.02.07 남산타워</button></Link>
                    </div>
                    <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_04" src={img4} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-4">2022.03.17 제주도</button></Link></div>
                    <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_05" src={img5} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-5">2022.04.20 속초</button></Link></div>
                    <div className="photo-layout-block">
                        <img className="phone-image" alt="iPhone_06" src={img6} />
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-6">2022.05.03 뉴욕</button></Link></div> */}

                </div>


            </div>

        );
    }

}
export default PhotoAlbum;