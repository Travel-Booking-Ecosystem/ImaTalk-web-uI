import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState, useEffect, useContext } from 'react';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import Loading from './components/Loading';
import LoadingContext from './contexts/LoadingContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from "./contexts/ToastContext";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // if token is in state, fetch user
    if (token) {
      fetchUser();
    } else {
      const accessTokenInLocalStorage = localStorage.getItem('token');

      if (accessTokenInLocalStorage) {
        setToken(accessTokenInLocalStorage);
      } else {
        navigate('/login');

      }
    }

  }, [token])


  const fetchUser = async () => {


    try {

      const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      setLoading(true); // show loading spinner
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, header);
      setLoading(false) // hide loading spinner
      console.log("response", response);
      const userProfile = response.data.data;
      setUser(userProfile);
    } catch (e) {
      //TODO: handle only when token is invalid or expired
      console.log("error", e);
      localStorage.removeItem('token');
      setToken(null);
    }

  }


  const showToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }



  return (
    <ToastContext.Provider value={{ showToast }}>

      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
          <Loading loading={loading} />

          <div className="App">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>
          </div >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />


        </UserContext.Provider>
      </LoadingContext.Provider>
    </ToastContext.Provider>



  );
}

function Logout() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  useEffect(() => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }, [])

  return (
    <div>

    </div>
  )
}

export default App;
