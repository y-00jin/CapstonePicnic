import React, { Component } from "react";
import { Link } from "react-router-dom";
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

        if (id === '' || password === '') {
            alert('아이디 및 비밀번호를 입력해주세요.');
        } else {
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


            memberList.length !== 0 ?
                memberList.map((el, key) => {   // 아이디 검색
                    if (el.id === id && el.password === password) {
                        // return <Link to ="/MainCalendar"></Link>
                        alert('로그인 완료 -> 메인페이지로 이동');
                    } else {
                        alert('사용자 정보를 확인해주세요.');
                    }
                }) : alert('사용자 정보를 확인해주세요.');
        }
    }


    _idUpdate(e) {
        this.setState({ id: e.target.value })
    }
    _passwordUpdate(e) {
        this.setState({ password: e.target.value })
    }


    render() {
        return (
            <main className="Main-login">
                {/* <form> */}

                <div class="signup-floating">
                    <input type="id" class="form-control" id="inputId" placeholder="id" onChange={(e) => this._idUpdate(e)} />
                    <label for="floatingInput">아이디</label>
                </div>

                <div class="signup-floating">
                    <input type="password" class="form-control" id="inputPw" placeholder="Password" onChange={(e) => this._passwordUpdate(e)} />
                    <label for="floatingPassword">비밀번호</label>
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