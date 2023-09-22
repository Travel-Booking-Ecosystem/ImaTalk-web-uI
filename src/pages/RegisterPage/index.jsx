import "./style.scss";
import React, { useState } from "react";
// import BackgroundImage from '../../assests/images/background2.jpg'
import BackgroundImage from '../../assests/images/background3.png'
import Logo from '../../assests/images/logo.svg'
import { Link } from "react-router-dom";
export default function ({ }) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="RegisterPage">
            <div className="image">
                <img src={BackgroundImage} alt="" />
            </div>
            <div className="main">
                {/* <div className="title">
                    <div className="logo">
                    </div>
                    <div className="title-text">
                        <ul>
                            <li>Last name is optional</li>
                            <li>Password has at least 8 characters</li>
                            <li>Password has at least one character, one letter, one special character</li>
                        </ul>

                        <div className="username-input">
                            <label className="label-text" for='email'>Username for you (edit if you want): </label>
                            <input type="text" id="email" />
                        </div>
                    </div>


                </div> */}

                <div className="form">
                    <div className="logo">
                        <img src={Logo} alt="" />
                        <div className="form-text"> 
                            <p class='big'>Register new account</p>
                            <p class='small'>Please enter your information</p>
                        </div>

                    </div>
                    <div className="input">
                        <label className="label-text" for='email'>First name:</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input">
                        <label className="label-text" for='email'>Last name:</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input">
                        <label className="label-text" for='email'>Email:</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input">
                        <label className="label-text" for="password">Password:</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input">
                        <label className="label-text" for="password">Repeat Password:</label>
                        <input type="password" id="password" />
                    </div>

                    <div className="submit-btn">Register</div>
                    <p className="link-text">Already have an account?<Link to="/login" class='link'> Login</Link></p>

                </div>

            </div>


        </div>
    )
}