import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../resoure/css/Main.css';
import Modal from "./Modal";
import axios from 'axios';

class ChangePw extends Component {
    // function ChangePw() {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            name: '',
            id: '',
            password: '',
            password2: '',
            memberList: []
        }
    };

    // const [modalOpen, setModalOpen] = useState(false);

    // const openModal = () => {
    //     setModalOpen(true);
    // };
    // const closeModal = () => {
    //     setModalOpen(false);
    // };

    openModal = () => {
        this.setState({ modalOpen: true })
    }
    closeModal = () => {
        this.setState({ modalOpen: false })
    }

    // 텍스트 및 스타일 변경
    _check_text(checkId, inText, fontColor) {
        document.getElementById(checkId).innerText = inText;
        document.getElementById(checkId).style.color = fontColor;
    }

    // id, name으로 데이터조회
    _keywordIdName = async () => {

        const { id, name } = this.state;

        if (id === '') {
            this._check_text("id-check-text", "필수 정보입니다.", "red");    // 아이디
        }
        if (name === '') {
            this._check_text("name-check-text", "필수 정보입니다.", "red");  // 이름
        }
        if (id !== '' && name !== '') {
            // 검색
            const res = await axios('/api/keywordId', {
                method: 'POST',
                data: {
                    'id': this.state.id,
                    'name': this.state.name
                },
                headers: new Headers()
            });
            this.setState({
                memberList: res.data
            })
            const { memberList } = this.state;

            memberList.length !== 0 ?
                memberList.map((el, key) => {
                    document.getElementById('name-check-text').innerText = '';
                    this.setState({ modalOpen: true })  // 모달창 열기

                }) : this._check_text('name-check-text', '해당 정보가 없습니다.', 'red');;

        }


    }



    _updatePw = async () => {
        
            // const res = await axios('/api/keywordUpdate', {
            //     method: 'POST',
            //     data: {
            //         'id': this.state.id,
            //         'pw': this.state.password
            //     },
            //     headers: new Headers()
            // })
            // if(res.data){
            //     alert('비밀번호 변경이 완료되었습니다.');
            //     return window.location.reload();
            // }
        

    }
    // 입력 값 변경되면 저장
    _idUpdate(e) {
        this.setState({ id: e.target.value });
        if (e.target.value.trim() === '') {
            this._check_text("id-check-text", "필수 정보입니다.", "red");    // 아이디
            document.getElementById('idInput').value = null;
        } else {
            this._check_text("id-check-text", "", "#958477");
        }
    }

    _nameUpdate(e) {
        this.setState({ name: e.target.value });
        if (e.target.value.trim() === '') {
            this._check_text("name-check-text", "필수 정보입니다.", "red");
            document.getElementById('nameInput').value = null;

        } else {
            this._check_text("name-check-text", "", "#958477");
        }
    }

    _passwordUpdate(e) {
        this.setState({ password: e.target.value })
        if (e.target.value.trim() === '') {
            this._check_text("new-pw2-text", "필수 정보입니다.", "red");
            document.getElementById('checkPw1').value = null;
        }
        else {
            this.changePwStyle();
        }

    }
    _password2Update(e) {
        this.setState({ password2: e.target.value })
        if (e.target.value.trim() === '') {
            this._check_text("new-pw2-text", "필수 정보입니다.", "red");
            document.getElementById('checkPw2').value = null;
        }
        else {
            this.changePwStyle();
        }
    }

    // 비밀번호 스타일 변경
    changePwStyle() {
        if (document.getElementById('checkPw1').value === document.getElementById('checkPw2').value && document.getElementById('checkPw1').value.trim() !== null && document.getElementById('checkPw2').value.trim() !== null) {

            this._check_text("new-pw1-text", "", "#958477");
            this._check_text("new-pw2-text", "사용 가능한 비밀번호 입니다.", "#1DDB16");

        } else {
            this._check_text("new-pw2-text", "비밀번호가 일치하지 않습니다.", "red");
        }
    }

    render() {
        return (
            <main className="Main-login">
                <div class="signup-floating">
                    <input type="id" class="form-control" id="idInput" placeholder="id" onChange={(e) => this._idUpdate(e)} />
                    <label for="floatingInput">아이디</label>
                </div>
                <div id="id-check-text">

                </div>
                <div class="signup-floating">
                    <input type="name" class="form-control" id="nameInput" placeholder="name" onChange={(e) => this._nameUpdate(e)} />
                    <label for="floatingPassword">이름</label>
                </div>
                <div id="name-check-text">

                </div>




                {/* 사용자 기억 기능 임시..폐쇄 */}
                {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}

                <footer className="Main-footer">

                    <React.Fragment>
                        <button className='Main-btn Main-btn-color' onClick={this._keywordIdName}>비밀번호 찾기</button>
                        <Modal open={this.state.modalOpen} close={this.closeModal} header="비밀번호 재설정">

                            <div class="modal-pilter">
                                <input type="password" class="form-control" id="checkPw1" placeholder="password" onChange={(e) => this._passwordUpdate(e)} />
                                <label for="floatingPassword">새 비밀번호</label>
                            </div>
                            <div id="new-pw1-text">

                            </div>
                            <div class="modal-pilter">
                                <input type="password" class="form-control" id="checkPw2" placeholder="password" onChange={(e) => this._password2Update(e)} />
                                <label for="floatingPassword">새 비밀번호 확인</label>
                            </div>
                            <div id="new-pw2-text">

                            </div>
                            <div className="pwFooter">
                                <hr className="pwHr"></hr>
                                <button className="ok" id='btnOk' onClick={this._updatePw}>
                                    확인
                                </button>
                            </div>
                        </Modal>
                    </React.Fragment>
                    {/* <Link to="/">
                        <button className="Main-btn Main-btn-color">비밀번호 변경</button>
                    </Link> */}
                </footer>
            </main>
        )
    }
}
export default ChangePw;