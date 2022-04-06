import React from "react";
import logo from '../resoure/image/Logo.png';
import headerLogo from '../resoure/image/spring.png';
import '../resoure/css/Main.css';
import { Link } from "react-router-dom";


function Main(){
    return(
            
            <div className="App">

            <header className="Main-header">
                <img src={headerLogo} className="Main-headerLogo" alt="headerLogo" />
            </header>

            <body className="Main-body">


            <p>' 너, 나들이 '<hr className="Main-hr"/><hr className="Main-hr"/></p>
            <img src={logo} className="Main-bodyLogo" alt="bodyLogo" />
            <Link to="/Canlendar">
                <button className="Main-btn Main-btn-color">다음</button>
            </Link>


            </body>
        </div>

    );
}

export default Main;