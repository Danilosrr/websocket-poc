import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/Globalstyle.css";
import Alert from "./components/Alert/Alert";
import Chat from "./components/Chat/Chat";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import UserContext from "./context/UserContext";

export default function App() {
  const room = "Sala";
  const username = "Danilo2";

  return (
    <UserContext.Provider value={{ room, username }}>
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="*" element={<Chat />}></Route>
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </UserContext.Provider>
  );
}
