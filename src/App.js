import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequiteAuth";
import Layout from "./components/layout/Layout";
import AdvertsPage from "./components/adverts/AdvertsPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./components/profile/ProfilePage";
import AdvertDetail from "./components/adverts/AdvertDetail";
import NotFoundPage from "./components/common/NotFoundPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileData } from "./store/actions/userActions";

import ForgetPassword from "./components/auth/ForgottenPassword";
import PasswordResset from "./components/auth/PasswordResset";
import NewAdvert from "./components/adverts/NewAdvert";
import storage from "./utils/storage";
import FavoritesPage from "./components/profile/Favorites";
import { io }from 'socket.io-client';
import ChatPage from "./components/chat/ChatPage";
import MyAdvertsPage from "./components/profile/MyAdverts";


const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

function App() {
  const dispatch = useDispatch();
  const token = storage.get("auth");

  useEffect(() => {
    if (token) {
      dispatch(profileData());
    }
  }, [dispatch,token]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertDetail />} />

          <Route
            path="/user-profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/user-profile/my-favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/user-profile/my-adverts"
            element={
              <RequireAuth>
                <MyAdvertsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/newadvert"
            element={
              <RequireAuth>
                <NewAdvert />
              </RequireAuth>
            }
          />
           <Route
            path="/chat"
            element={
              <RequireAuth>
                <ChatPage socket={socket}/>
              </RequireAuth>
            }
          />
        </Route>
       
        <Route path="/passwordReset" element={<PasswordResset />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/login" element={<LoginPage socket={socket}/>} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
