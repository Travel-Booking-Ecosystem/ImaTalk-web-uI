import "./style.scss";
import React, { useState, useEffect, useContext } from "react";
import BackgroundImage from '../../assests/images/background1.png'
import Logo from '../../assests/images/dsy-logo.png'
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import LoadingContext from "../../contexts/LoadingContext";
import axios from "axios";


export default function ({ }) {
    const navigate = useNavigate();
    const { setLoading } = useContext(LoadingContext);
    const { setToken, token } = useContext(UserContext);
    const [errorText, setErrorText] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }


    const toggleShowPassword = () => {
        setShowPassword(val => !val);
    }


    const handleLogin = async () => {
        if (!formData.email || !formData.password) return 

        setLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData);
        setLoading(false);
        
        if (response.data.status == 200) {
            const accessToken = response.data.data.accessToken;
            localStorage.setItem("token", accessToken);
            setToken(accessToken);
            navigate('/') // redirect to home page
        } else {
            setErrorText(response.data.message);
        }
    }

    //TODO: new separate component 
    //TODO: refactor css, style classes
    // TODO: show password button


    // with token the home page will automatically fetch user data
    if (token) {
        navigate('/'); // redirect to home page if user is already logged in
    }
    return (
        <div className="LoginPage">
            <div className="background-image">
                <img src={BackgroundImage} alt="" />
            </div>
            <div className="content">
                <div className="form-title">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="title-text">
                        <div className="big">Login to start chatting</div>
                        {errorText ? <div className="error-text">{errorText}</div> :
                        <div className="small">Please enter your details</div>

                        }
                    </div>
                </div>
                {/* <div className="error-text">{errorText}</div> */}
                <div className="form-input-container">
                    <div className="input">
                        <label className="label-text" for='email'>Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleChange} />
                    </div>
                    <div className="input password-input">
                        <label className="label-text" for="password" >Password:</label>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            id="password"
                            value={formData.password}
                            onChange={handleChange} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin();
                                }
                            }}
                            />

                        <div className="show-password-btn" onClick={toggleShowPassword}>
                            {showPassword ? "Hide " : "Show "} password
                        </div>
                    </div>

                    <div className="submit-btn" onClick={handleLogin}>Login</div>
                </div>
                <p className="link-text">Don't have an account?<Link to="/register" class='link'> Register</Link></p>

            </div>
        </div>
    )
}