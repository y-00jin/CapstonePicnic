import React from "react";
import logo from '../resoure/image/Logo.png';
import headerLogo from '../resoure/image/spring.png';
import '../resoure/css/Main.css';
import { Link } from "react-router-dom";


function Main() {
    return (

        <div className="Main">
            
            {/* 스프링 로고 */}
            <header className="Main-header">
                <img src={headerLogo} className="Main-headerLogo" alt="headerLogo" />
            </header>

            {/* 메인 로고 */}
            <body className="Main-body">
                <p>' 너, 나들이 '<hr className="Main-hr" /><hr className="Main-hr" /></p>
                <img src={logo} className="Main-bodyLogo" alt="bodyLogo" />
            </body>

            {/* 로그인 */}
            <body class="text-center">
                <main className="Main-login">
                    <form>
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                        <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">아이디를 입력해주세요</label>
                        </div>
    
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">비밀번호를 입력해주세요</label>
                        </div>

                        {/* 사용자 기억 기능 임시..폐쇄 */}
                        {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}
    
                        <footer className="Main-footer">
                            <Link to="/Calendar">
                                <button className="Main-btn Main-btn-color">로그인</button>
                            </Link>
                        </footer>
                    </form>
                </main>
            </body>

            {/* 다음 버튼 */}
            {/* <footer className="Main-footer">
                <Link to="/Calendar">
                    <button className="Main-btn Main-btn-color">다음</button>
                </Link>
            </footer> */}

        </div>

    );
}

export default Main;