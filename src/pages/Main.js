import { Component } from "react"
import logo from '../resoure/image/Logo.png';
import headerLogo from '../resoure/image/spring.png';
import '../resoure/css/Main.css';
import { Link } from "react-router-dom";
import Login from "./LoginContents/Login"
import SignUp from "./LoginContents/SignUp"
import ChangePw from "./LoginContents/ChangePw"

const obj = {
    0: <Login/>,
    1: <SignUp />,
    2: <ChangePw />,
};
  
const arr = ["First", "Second", "Third"];
  
{arr.map((str, idx) => {
              return (
                <li key={str} onClick={() => this.clickHandler(idx)}>
                  {str}
                </li>
              );
            })}


export default class Main extends Component {

    state = {
        activeId: 0,
      };
    
      clickHandler = (id) => {
        this.setState({ activeId: id });
      };

    
    render() {
        return (

            <>

                {/* 스프링 로고 */}
                <header className="Main-header">
                    <img src={headerLogo} className="Main-headerLogo" alt="headerLogo" />
                </header>

                {/* 메인 로고 */}
                <body className="Main-body">
                    ' 너, 나들이 '
                    <hr className="Main-hr" />
                    <hr className="Main-hr" />
                    <img src={logo} className="Main-bodyLogo" alt="bodyLogo" />
                </body>

                {/* 로그인 */}
                <body className="text-center">

                    <main className="Main-login">
                        <ul className="nav justify-content-center">
                            <li className="login-tab-btn" onClick={() => this.clickHandler(0)}>로그인　　</li>
                            <li className="signup-tab-btn" onClick={() => this.clickHandler(1)}>회원가입　　</li>
                            <li className="chagnepw-tab-btn" onClick={() => this.clickHandler(2)}>비밀번호 찾기</li>
                        </ul>

                        {/* <h1 class="h3 mb-3 fw-normal">Please sign in</h1> */}

                        {/* <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">아이디</label>
                        </div>

                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">비밀번호</label>
                        </div> */}

                        {/* 사용자 기억 기능 임시..폐쇄 */}
                        {/* <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div> */}

                        <footer className="Main-footer">
                            {obj[this.state.activeId]}
                        </footer>

                    </main>
                </body>

                {/* 다음 버튼 */}
                {/* <footer className="Main-footer">
                <Link to="/Calendar">
                    <button className="Main-btn Main-btn-color">다음</button>
                </Link>
            </footer> */}

            </>

        );
    }
}