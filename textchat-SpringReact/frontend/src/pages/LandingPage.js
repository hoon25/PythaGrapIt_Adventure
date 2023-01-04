import React from 'react'
import {Link} from 'react-router-dom'

import '../../../frontend/src/App.css'
import BackgroundImage from '../../../frontend/src/main.jpg'

export default function LandingPage({user}) {

    return (
        <header style={HeaderStyle}>
            <h1 className="main-title text-center">PytaGrapIt</h1>
            <div className="buttons text-center">
                {/*{*/}
                {/*    user.nickName == null?*/}
                {/*    <>*/}
                {/*    <Link to="/login">*/}
                {/*        <button className="primary-button">log in</button>*/}
                {/*    </Link>*/}
                {/*    <Link to="/register">*/}
                {/*        <button className="primary-button" id="reg_btn"><span>register </span></button>*/}
                {/*    </Link>*/}
                {/*    </>*/}
                {/*}*/}

                {/*<Link to="/login">*/}
                {/*    <button className="primary-button">log in</button>*/}
                {/*</Link>*/}
                {/*<Link to="/register">*/}
                {/*    <button className="primary-button" id="reg_btn"><span>register </span></button>*/}
                {/*</Link>*/}
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}