import React from 'react';
import { Link } from "react-router-dom";
import '../../resoure/css/Main.css';

function Login() {
    return(
        <main className="Main-login">
                    <form>
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                        <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">아이디</label>
                        </div>
    
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">비밀번호</label>
                        </div>

                        {/* 사용자 기억 기능 임시..폐쇄 */}
                        {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}
    
                        <footer className="Main-footer">
                            <Link to="/MainCalendar">
                                <button className="Main-btn Main-btn-color">로그인</button>
                            </Link>
                        </footer>
                    </form>
                </main>
    )
}

export default Login;