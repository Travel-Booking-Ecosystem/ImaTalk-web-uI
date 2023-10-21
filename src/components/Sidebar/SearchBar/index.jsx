import "./style.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";
export default function ({ }) {

    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [peopleList, setPeopleList] = useState([]); // this is the list of people that will be displayed in the search result

    useEffect(() => {
        // show search result when user types something
        if (searchKeyword) {
            if (!showSearchResult) {
                setShowSearchResult(true);
            }
            searchPeople()
        } else {
            setShowSearchResult(false);
        }
    }, [searchKeyword])


    const { user, token } = useContext(UserContext);
    const searchBoxRef = useRef(null);



    const searchPeople = async () => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search/?keyword=${searchKeyword}`, header)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search/people?keyword=${searchKeyword}`, header)
        // console.log();

        if (response.data.status == 200) {
            const peopleList = response.data.data;
            console.log("peopleList", peopleList);
            setPeopleList(peopleList)

        }

        console.log("peopleList", peopleList);
    }

    const handleAddFriend = async (id) => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const body = {
            userId: id
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/add-friend?otherUserId=${id}`, body, header)
        // console.log();
        if (response.data.status == 200) {

            setPeopleList(prev => {
                const newList = prev.map(people => {
                    if (people.id == id) {
                        return {
                            ...people,
                            requestSent: true
                        }
                    }
                    return people
                })
                return newList
            })

        }
    }


    const peopleArray = [
        {
            avatar: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww",
            displayName: "Caryn A. Smith",
            username: "@caryn"
        },
        {
            avatar: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww",
            displayName: "Caryn O. Smith",
            username: "@caryn"
        },
        {
            avatar: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww",
            displayName: "Caryn S. Smith",
            username: "@caryn"
        }
    ]



    useEffect(() => {
        // Function to handle clicks outside the search box
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setShowSearchResult(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array ensures the effect runs once after initial render

    const closeSearchBox = () => {
        setShowSearchResult(false);
    };

    return (
        <div className="SearchBar" ref={searchBoxRef}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text"
                placeholder="Search for friends, peple,..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)} />
            <i class="fa-solid fa-circle-xmark close-search-box" onClick={closeSearchBox}></i>


            {showSearchResult && <div className="search-result" >
                <div className="tab-container">
                    {/* <p className="tab">Messages</p> */}
                    <p className="tab">Friends</p>
                    <p className="tab active-tab">People</p>
                </div>

                <div className="people-container">
                    {
                        peopleList.map((people, index) => {
                            return (
                                <People
                                    key={index}
                                    {...people}
                                    onClickAddFriend={() => handleAddFriend(people.id)}
                                />
                            )
                        })
                    }
                </div>
            </div>}

        </div>
    )
}



function People({ avatar, displayName, username, onClickAddFriend, friend, requestSent }) {
    const style = (!avatar && !displayName && !username) ? "skeleton-UserInfo" : "";

    return (
        <div className="People">
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="info">
                <p className="displayName">{displayName}</p>
                <p className="username">{username}</p>
            </div>

            {!friend && !requestSent && <div className="add-friend-btn" onClick={onClickAddFriend}>Add Friend</div>}
            {!friend && requestSent && <div className="request-sent-btn">Request Sent</div>}
        </div>
    )
}

