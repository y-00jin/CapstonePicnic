import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../resoure/css/Main.css';
import Modal from "./Modal";


function ChangePw() {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    

    return (
        <main className="Main-login">
            <div class="signup-floating">
                <input type="name" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">이름</label>
            </div>
            <div class="signup-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">아이디</label>
            </div>



            {/* 사용자 기억 기능 임시..폐쇄 */}
            {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}

            <footer className="Main-footer">

                <React.Fragment>
                    <button className='Main-btn Main-btn-color' onClick={openModal}>비밀번호 찾기</button>
                    <Modal open={modalOpen} close={closeModal} header="비밀번호 재설정">

                        <div class="modal-pilter">
                            <input type="password" class="form-control" id="pw1" placeholder="Password" />
                            <label for="floatingPassword">새 비밀번호</label>
                        </div>

                        <div class="modal-pilter">
                            <input type="password" class="form-control" id="pw2" placeholder="Password" />
                            <label for="floatingPassword">새 비밀번호 확인</label>
                        </div>
                        <div className="pwFooter">
                            <hr className="pwHr"></hr>
                            <button className="ok">
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

export default ChangePw;