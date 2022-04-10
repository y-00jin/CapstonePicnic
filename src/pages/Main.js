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

            {/* 다음 버튼 */}
            <footer className="Main-footer">
                <Link to="/Calendar">
                    <button className="Main-btn Main-btn-color">다음</button>
                </Link>

            </footer>

        </div>

    );
}

export default Main;