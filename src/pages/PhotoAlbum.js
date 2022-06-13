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
            memorys: []
        }


    };

    /* 달력 페이지가 시작됬을때 처리 */
    memoryLoad = async () => {
        const check = this.state.check;
        let memorylen = 0;


        if (check === false) {
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
                memoryList: res.data
            })
            const { memoryList } = this.state;

            const memorys = this.state.memorys;

            memoryList.length !== 0 ?
                memoryList.map((el, key) => {   // 아이디 검색

                    console.log("날짜 : " + el.memory_date.slice(0, 10));

                    memorys.push(el.memory_date.slice(0, 10));


                }) : console.log("못찾음")

            this.memorylen = memorys.length;

            // const divMemory = [];
            // for(let i=0; i<memorys.length;i++){
            //     console.log('g');
            //     divMemory.push(
            //         <div class="photo-layout-block">
            //                  <img className="phone-image" alt="iPhone_01" src={img1} />
            //                  <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
            //         </div>
            //     )

            // }

            console.log(" memorylen : " + memorylen);

            // return memorylen;
            // this.test(memoryList);


            // console.log("ddd"+this.state.memorys);
            // var array = [];
            // for(let i =0; i <memorys.length;i++){
            //     array.push(
            //         <div class="photo-layout-block">
            //             <img className="phone-image" alt="iPhone_01" src={img1} />
            //             <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
            //         </div>
            //     )
            // }
            // return array;
        }

    };

    Test1 = (props) => {

        this.memoryLoad();

        const memorys = this.state.memorys;
        console.log("memorys : " + this.memorys);

        const divMemory = [];
        for (let i = 0; i < memorys.length; i++) {
            divMemory.push(
                <div class="photo-layout-block">
                    <img className="phone-image" alt="iPhone_01" src={img1} />
                    <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
                </div>
            )
        }


        return <div class="photo-layout">{divMemory}</div>;



    }

    // Test() {

    // let len = this.memoryLoad();


    // const promise1 = new Promise((resolve, reject) => {
    //     resolve(this.memoryLoad());
    //   });

    //   promise1.then((value) => {

    //     console.log("value : " + value);
    //     const divMemory = [];
    //     for(let i=0; i<value;i++){
    //         divMemory.push(
    //             <div class="photo-layout-block">
    //                      <img className="phone-image" alt="iPhone_01" src={img1} />
    //                      <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
    //             </div>
    //         )
    //     }


    //     return <div class="photo-layout">{divMemory}</div>;


    //     // expected output: "Success!"
    //   });


    // this.memoryLoad();

    // console.log("state " + this.state.memorys.length);
    // const divMemory = [];
    // for (let i = 0; i < 3; i++) {
    //     divMemory.push(
    //         <div className="photo-layout-block">
    //             <img className="phone-image" alt="iPhone_01" src={img1} />
    //             <Link to="/Memory"><button className="photo-btn" id="photo-btn-1">2022.01.03 강릉</button> </Link>
    //         </div>
    //     )
    // }
    // return <div className="photo-layout">{divMemory}</div>;
    // console.log("len : " + len);
    // }

    // const [dateRange, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = dateRange;

    search = (props) => {

        // let searchPlace = document.getElementById('searchPlace').value;
        // let dateFormat = "yyyy-MM-dd";
        // const dateStart = format(this.state.dateStart, dateFormat);
        // const dateEnd = format(this.state.dateEnd, dateFormat);


        // console.log("searchPlace : " + searchPlace + "" + format(dateStart, dateFormat) + format(dateEnd, dateFormat));

        this.searchMemoryLoad();
    }

    searchMemoryLoad = async () => {

        // const sessionId = this.state.sessionId;
        const sessionId = window.localStorage.getItem("sessionId");
        const searchPlace = document.getElementById('searchPlace').value;
        
        console.log("sessionId : " + sessionId + "searchPlace : " + searchPlace);
        
        let dateFormat = "yyyy-MM-dd";
        // let dateStart = format(this.state.dateStart, dateFormat);
        // let dateEnd = format(this.state.dateEnd, dateFormat);
        let dateStart = this.state.dateStart;
        let dateEnd = this.state.dateEnd;

        // 모든 필드가 비어있으면 id로 추억 전체 검색
        if(searchPlace === '' && dateStart === null && dateEnd === null){
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

        if(searchPlace === '' && dateStart !== null && dateEnd !== null){
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

        if(searchPlace !== null && dateStart === null && dateEnd === null){
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

        if(searchPlace !== null && dateStart !== null && dateEnd !== null){
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
        
        
        const { searchList } = this.state;

        // const memorys = this.state.memorys;

        searchList.length !== 0 ?
            searchList.map((el, key) => {   // 아이디 검색

                console.log(el.memory_date.slice(0, 10));

                // console.log("날짜 : " + el.memory_date.slice(0, 10));

                // memorys.push(el.memory_date.slice(0, 10));


            }) : console.log("없음")

    };


    render() {
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

                {/* {this.Test1()} */}

                <div className="photo-layout" id="photo-layout-id">

                    {/* {this.Test()} */}


                    <div className="photo-layout-block">
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
                        <Link to="/Memory"><button className="photo-btn" id="photo-btn-6">2022.05.03 뉴욕</button></Link></div>

                </div>


            </div>

        );
    }

}
export default PhotoAlbum;