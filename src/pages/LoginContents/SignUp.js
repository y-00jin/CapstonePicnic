import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../resoure/css/Main.css';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            password: '',
            password2: ''
        }
    };

    //  데이터 추가
    _addData = async (e) => {
        const { id, password, password2, name } = this.state;
        e.preventDefault();
        if (id == '' || password == '' || password2 == '' || name == '') {    // 정보 입력 안했을 경우
            alert('정보를 모두 입력해주세요');
        } else {
            if (password == password2) {  // 비밀번호, 비밀번호 재입력이 같은 경우

                const res = await axios('/api/test', {
                    method: 'POST',
                    data: {
                        'id': id,
                        'password': password,
                        'name': name
                    },
                    headers: new Headers()
                });

                if (res.data) {
                    alert('회원가입이 완료되었습니다.');
                    return window.location.reload();
                }
            } else {
                alert('비밀번호를 확인해주세요.');
            }
        }
    }

    _idUpdate(e) {
        this.setState({ id: e.target.value })
    }
    _passwordUpdate(e) {
        this.setState({ password: e.target.value })
    }
    _password2Update(e) {
        this.setState({ password2: e.target.value })
    }
    _nameUpdate(e) {
        this.setState({ name: e.target.value })
    }



    
    render() {
        return (
            <main className="Main-login">
                <form method="POST">
                    <div class="form-floating">
                        <input type="name" class="form-control" id="floatingInput" placeholder="name" onChange={(e) => this._nameUpdate(e)} />
                        <label for="floatingInput">이름</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="id" onChange={(e) => this._idUpdate(e)} />
                        <label for="floatingInput">아이디</label>
                    </div>

                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="password" onChange={(e) => this._passwordUpdate(e)} />
                        <label for="floatingPassword">비밀번호</label>
                    </div>

                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="password2" onChange={(e) => this._password2Update(e)} />
                        <label for="floatingPassword">비밀번호 재확인</label>
                    </div>


                    {/* 사용자 기억 기능 임시..폐쇄 */}
                    {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}

                    <footer className="Main-footer">
                        <Link to="/">
                            <button className="Main-btn Main-btn-color" value='Add' onClick={this._addData}>회원가입</button>
                        </Link>
                        {/* <input type="submit">회원가입</input> */}
                    </footer>
                </form>
            </main>
        )
    }
}

export default SignUp;