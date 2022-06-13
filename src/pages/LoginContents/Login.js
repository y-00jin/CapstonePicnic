import React, { Component } from "react";
import '../../resoure/css/Main.css';
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            memberList: [],
            checkId: ''

        }
    };

        // 데이터 검색
        _getKeywordData = async () => {
            const { id, password } = this.state;
            console.log(id, password);
            if (id === '') {
                this._check_text("id-check-text", "아이디를 입력해주세요.", "red");
            }if(password === ''){
                this._check_text("pw-check-text", "비밀번호를 입력해주세요.", "red");
            }
            if(id !=='' && password !== '') {
                // 검색
                const res = await axios('/api/keywordData', {
                    method: 'POST',
                    data: {
                        'id': this.state.id
                    },
                    headers: new Headers()
                });
    
                this.setState({
                    memberList: res.data
                })
                const { memberList } = this.state;
    
                memberList.length !== 0 ?memberList.map((el, key) => {   // 아이디 검색
                    if (el.id === id && el.password === password) {
                            // return <Link to ="/MainCalendar"></Link>
                            // const userObj = { userId : id };
                            // window.localStorage.setItem("sessionId", JSON.stringify(userObj));
                            window.localStorage.setItem("sessionId", id);
                            window.location.href = 'http://localhost:3000/MainCalendar';
                        } else {
                            alert('사용자 정보를 확인해주세요1.');
                        }
                    }) : alert('사용자 정보를 확인해주세요2.');
            }
        }

    // 텍스트 및 스타일 변경
    _check_text(checkId, inText, fontColor) {
        document.getElementById(checkId).innerText = inText;
        document.getElementById(checkId).style.color = fontColor;
    }




    
    _idUpdate(e) {
        this.setState({ id: e.target.value })
        if (e.target.value.trim() === '') {
            this._check_text("id-check-text", "아이디를 입력해주세요.", "red");    // 아이디
            document.getElementById('inputId').value = null;
        } else {
            this._check_text("id-check-text", "", "black");
        }
    }
    _passwordUpdate(e) {
        this.setState({ password: e.target.value })
        if (e.target.value.trim() === '') {
            this._check_text("pw-check-text", "비밀번호를 입력해주세요.", "red");    // 아이디
            document.getElementById('inputPw').value = null;
        } else {
            this._check_text("pw-check-text", "", "black");
        }
    }


    render() {
        return (
            <main className="Main-login">
                {/* <form> */}

                <div className="signup-floating">
                    <input type="id" className="form-control" id="inputId" placeholder="id" onChange={(e) => this._idUpdate(e)} />
                    <label htmlFor="floatingInput">아이디</label>
                </div>
                <div id="id-check-text">

                </div>

                <div className="signup-floating">
                    <input type="password" className="form-control" id="inputPw" placeholder="Password" onChange={(e) => this._passwordUpdate(e)} />
                    <label htmlFor="floatingPassword">비밀번호</label>
                </div>
                <div id="pw-check-text">

                </div>

                {/* 사용자 기억 기능 임시..폐쇄 */}
                {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}

                <footer className="Main-footer">
                    {/* <Link to="/MainCalendar"> */}
                    <button className="Main-btn Main-btn-color" onClick={this._getKeywordData}>로그인</button>
                    {/* </Link> */}
                </footer>
                {/* </form> */}
            </main>
        )
    }
}
export default Login;