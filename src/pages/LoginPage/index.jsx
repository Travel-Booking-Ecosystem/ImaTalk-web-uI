import "./style.scss";
import React, { useState } from "react";
import BackgroundImage from '../../assests/images/background1.png'
import Logo from '../../assests/images/logo.svg'
import { Link } from "react-router-dom";
export default function ({ }) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="LoginPage">
            <div className="image">
                <img src={BackgroundImage} alt="" />
            </div>
            <div className="main">
                <div className="title">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="title-text">
                        <div className="big">Login to start chatting</div>
                        <div className="small">Please enter your details</div>
                    </div>


                </div>

                <div className="form">
                    <div className="input">
                        <label className="label-text" for='email'>Email:</label>
                        <input type="text" id="email"/>
                    </div>
                    <div className="input">
                        <label className="label-text" for="password">Password:</label>
                        <input type="password" id="password" />
                        {/* <p className="show">show</p> */}

                    </div>

                    <div className="submit-btn">Login</div>
                </div>

                <p className="link-text">Don't have an account?<Link to="/register" class='link'> Register</Link></p>

            </div>
        </div>
    )
}