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
            password2: '',
            memberList: [],
            checkId: ''
        }
    };


    //  데이터 추가
    _addData = async (e) => {

        
        const { id, password, password2, name, checkId } = this.state;
        e.preventDefault();
        if (id === '' || password === '' || password2 === '' || name === '') {    // 정보 입력 안함
            document.getElementById("id-check-text").innerText = "필수 정보입니다.";
            document.getElementById('idInput').style.borderColor = "red";

            document.getElementById("pw1-check-text").innerText = "필수 정보입니다.";
            document.getElementById('checkPw1').style.borderColor = "red";

            document.getElementById("pw2-check-text").innerText = "필수 정보입니다.";
            document.getElementById('checkPw2').style.borderColor = "red";
            
            document.getElementById("name-check-text").innerText = "필수 정보입니다.";
            document.getElementById('nameInput').style.borderColor = "red";

            // alert('정보를 입력해주세요');
        } else {

            if(password === password2 && checkId === 'false') {   // 비밀번호 동일 && 아이디 중복 체크 -> insert
                const res = await axios('/api/add', {
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
                    return window.location.reload();    // 새로고침
                }
            } else {
                if(password !== password2 ){  // 비밀번호 동일 X
                    document.getElementById("pw2-check-text").innerText = "비밀번호가 일치하지 않습니다.";
                    // alert('비밀번호를 확인해주세요.');
                } 
                else{    // 아이디 중복 확인 X
                    document.getElementById("id-check-text").innerText = "아이디 중복 확인을 해주세요";
                    // alert('아이디 중복 확인을 해주세요.');
                }
            }
        }
    }


    

    // componentDidMount() {
    //     this._getData();
    // }

    // 전체 데이터 조회
    // _getData = async () => {
    //     const res = await axios.get('/api/data');
    //     this.setState({
    //         memberList: res.data
    //     })
    // }


    // id로 데이터조회
    _getKeywordData = async () => {
        const { id } = this.state;
        if (id === '') {
            document.getElementById("id-check-text").innerText = "필수 정보입니다.";
            
            // alert('아이디를 입력해주세요.');
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

                        document.getElementById('id-check-text').innerText = "이미 사용중인 아이디입니다.";
                        // alert('이미 사용중인 아이디입니다.');
                        document.getElementById('idInput').style.borderColor = "red";   // 테두리 색 red
                        document.getElementById('idInput').value = null;                // 입력값 비우기
                        this.setState(
                            {
                                id:'',
                                checkId:'true'
                            }
                        )
                    }) : this.checkIdFlae();
            
        }
    }

    // 사용 가능한 id인 경우
    checkIdFlae(){
        document.getElementById('idInput').style.borderColor = "#00f005";
        document.getElementById("id-check-text").innerText = "사용 가능한 아이디입니다.";
        document.getElementById("id-check-text").style.color = "#343a40";
        // alert('사용 가능한 아이디입니다.');
        this.setState({
            checkId:'false'
        })
    }

    // 입력 값 변경되면 저장
    _idUpdate(e) {
        this.setState({ id: e.target.value, checkId:'true' })
        document.getElementById('idInput').style.borderColor = "red";
    }
    _passwordUpdate(e) {
        this.setState({ password: e.target.value })
        this.changePwStyle();
    }
    _password2Update(e) {
        this.setState({ password2: e.target.value })
        this.changePwStyle();
    }
    _nameUpdate(e) {
        this.setState({ name: e.target.value })
        if(e.target.value === null){
            document.getElementById("name-check-text").innerText = "필수 정보입니다.";
            document.getElementById('nameInput').style.borderColor = "red";
        } else{
            document.getElementById("name-check-text").innerText = "";
        document.getElementById('nameInput').style.borderColor = "#00f005";
        }

        
    }

    // 비밀번호 스타일 변경
    changePwStyle(){
        if(document.getElementById('checkPw1').value === document.getElementById('checkPw2').value){
            document.getElementById("pw1-check-text").innerText = "";
            document.getElementById('checkPw1').style.borderColor = "#00f005";
            document.getElementById("pw2-check-text").innerText = "사용 가능한 비밀번호 입니다.";
            document.getElementById("pw2-check-text").style.color = "#343a40";
            document.getElementById('checkPw2').style.borderColor = "#00f005";

        }else{
            document.getElementById('checkPw2').style.borderColor = "red";
            document.getElementById("pw2-check-text").innerText = "비밀번호가 일치하지 않습니다.";
        }
    }


    render() {
        // const { memberList } = this.state;
        return (
            <main className="Main-login">

                <div class="signup-id">
                    <div class="form-floating-id">
                        <input type="id" class="form-control" id="idInput" placeholder="id" onChange={(e) => this._idUpdate(e)} />
                        <label for="floatingInput">아이디</label>
                    </div>
                    <button className="signup-btn signup-btn-color" id="check" onClick={this._getKeywordData}>중복 확인</button>
                </div>
                <div id="id-check-text">
                     
                </div>


                <div class="signup-floating">
                    <input type="password" class="form-control" id="checkPw1" placeholder="password" onChange={(e) => this._passwordUpdate(e)} />
                    <label for="floatingPassword">비밀번호</label>
                </div>
                <div id="pw1-check-text">

                </div>

                <div class="signup-floating">
                    <input type="password" class="form-control" id="checkPw2" placeholder="password2" onChange={(e) => this._password2Update(e)} />
                    <label for="floatingPassword">비밀번호 재확인</label>
                </div>
                <div id="pw2-check-text">
                    
                </div>

                <div class="signup-floating">
                    <input type="name" class="form-control" id="nameInput" placeholder="name" onChange={(e) => this._nameUpdate(e)} />
                    <label for="floatingInput">이름</label>
                </div>
                <div id="name-check-text">
                    
                </div>

                <footer className="Main-footer">
                    <Link to="/">
                        <button className="Main-btn Main-btn-color" value='Add' onClick={this._addData}>회원가입</button>
                    </Link>
                </footer>
            </main>
        )
    }
}

export default SignUp;