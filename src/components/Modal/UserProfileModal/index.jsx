import UserContext from "../../../contexts/UserContext";
import "./style.scss";
import React, { useContext, useState } from "react";

export default () => {
    const { user, setUser, setToken } = useContext(UserContext)
    const [displayNameInput, setDisplayNameInput] = useState(user?.displayName);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);

        window.location.reload();
    }
    return (
        <div className="UserProfileModal">
            <div className="info">
                <div className="avatar">
                    <img src={avatarUrl} alt="" />
                    <label className="change-avatar-btn" htmlFor="avatar-file">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <input type="file" class='hidden' id='avatar-file'/>    
                    </label>
                </div>
                <div className="text">
                    <div className="display-name">{displayNameInput}</div>
                    <div className="email"><span className="bold">Email:</span>  {user.email}</div>
                    <div className="username"> <span className="bold">Username: </span> {user.username}</div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="firstName" className='label'>
                    <p className="label-name">Display name</p>
                    <input type="text" value={displayNameInput} onChange={e => setDisplayNameInput(e.target.value)} />
                    <p className="edit-btn"><i class="fa-regular fa-pen-to-square"></i></p>
                </label>
                <label htmlFor="firstName" className='label'>
                    <p className="label-name">Phone number:</p>
                    <input type="text" />
                    <p className="edit-btn"><i class="fa-regular fa-pen-to-square"></i></p>
                </label>
                <label htmlFor="firstName" className='label'>
                    <p className="label-name">City:</p>
                    <input type="text" />
                    <p className="edit-btn"><i class="fa-regular fa-pen-to-square"></i></p>
                </label>
                <label htmlFor="firstName" className='label'>
                    <p className="label-name">Country:</p>
                    <input type="text" />
                    <p className="edit-btn"><i class="fa-regular fa-pen-to-square"></i></p>
                </label>
            </div>

            <div className="btn-container">
                {/* <div className="btn save-btn">Save</div> */}
                <div className="btn logout-btn" onClick={handleLogout}>Logout</div>
            </div>
        </div>
    );
};

// if (showModal) {
//     return null;
// }