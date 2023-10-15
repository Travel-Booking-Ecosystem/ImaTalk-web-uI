import "./style.scss";
import React, { useState, useContext} from "react";
// import BackgroundImage from '../../assests/images/background2.jpg'
import BackgroundImage from '../../assests/images/background3.png'
import Logo from '../../assests/images/dsy-logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import ToastContext from '../../contexts/ToastContext'
export default function ({ }) {

    const [showPassword, setShowPassword] = useState(false) 
    const [errorText, setErrorText] = useState('')
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const { showToast } = useContext(ToastContext);
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleRegister = async () => {
        if (formData.password !== formData.repeatPassword) {
            setErrorText('Password does not match')
            return
        }   

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData);
        if (response.data.status == 200) {
            setErrorText('')
            showToast('Register successfully')
            window.location.href = '/login'
        } else {
            setErrorText(response.data.message);
        }


    }

    return (
        <div className="RegisterPage">
            <div className="background-image">
                <img src={BackgroundImage} alt="" />
            </div>
            <div className="content">
                <div className="form-input-container">
                    <div className="logo">
                        <img src={Logo} alt="" />
                        <div className="form-text"> 
                            <p class='big'>Register new account</p>
                            <p class='small'>Please enter your information</p>
                        </div>

                    </div>
                    <label className="error-text" for='email'>{errorText}</label>

                    <div className="input">
                        <label className="label-text" for='email'>Display name</label>
                        <input type="text" value={formData.displayName} name="displayName" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label className="label-text" for='email'>User name: @</label>
                        <input type="text" value={formData.username} name="username" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label className="label-text" for='email'>Email:</label>
                        <input type="text" value={formData.email} name="email" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label className="label-text" for="password">Password:</label>
                        <input type={showPassword ? 'text' : 'password'} value={formData.password} name="password" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label className="label-text" for="password">Repeat Password:</label>
                        <input type={showPassword ? 'text' : 'password'} value={formData.repeatPassword} name="repeatPassword" onChange={handleChange}/>
                    </div>
                    <div className="show-password-btn" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide password' : "Show password"}
                    </div>

                    <div className="submit-btn" onClick={handleRegister}>Register</div>
                    <p className="link-text">Already have an account?<Link to="/login" class='link'> Login</Link></p>
                </div>

            </div>


        </div>
    )
}