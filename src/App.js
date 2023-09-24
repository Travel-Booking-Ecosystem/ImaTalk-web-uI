import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import Loading from './components/Loading';
import LoadingContext from './contexts/LoadingContext';
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // check if token is in local storage
    const accessTokenInLocalStorage = localStorage.getItem('token');
    if (accessTokenInLocalStorage) {
      setToken(accessTokenInLocalStorage);
      return;
    }
  }, [])

  useEffect(() => {

    // if token is in state, fetch user
    if (token) {
      fetchUser();
      return;
    } else {
      const accessTokenInLocalStorage = localStorage.getItem('token');
      if (accessTokenInLocalStorage) {
        setToken(accessTokenInLocalStorage);
      } else {
        navigate('/login');

      }
    }

    // const minamino = {
    //   id: 1,
    //   displayName: "Minamino",
    //   username: "@minamino21412",
    //   avatar: "https://th.bing.com/th/id/OIP.ZpNOsfN4Tzl8UMtCe7j2kwHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=1.3"
    // }

    // setUser(minamino);
  }, [token])


  const fetchUser = async () => {


    try {

      const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/profile`, header);
      const userProfile = response.data.data;
      setUser(userProfile);


      const firstConversationId = userProfile.directConversationList[0].id;
      const response2 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/get-direct-conversation-messages?conversationId=${firstConversationId}`, header)
      const conversation = response2.data;
    } catch (e) {
      console.log("error", e);
      // localStorage.removeItem('token');
      setToken(null);
    }

  }


  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Loading isLoading={loading} />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div >

      </UserContext.Provider>
    </LoadingContext.Provider>





  );
}

export default App;
