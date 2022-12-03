import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/Globalstyle.css";
import Chat from "./components/Chat";
import UserContext from "./context/UserContext";

export default function App() {
  const room = "Sala";
  const username = "Danilo2";

  return (
    <UserContext.Provider value={{ room, username }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
