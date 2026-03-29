import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import Menu from "./Components/Menu/Menu";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Homepage from "./Components/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ResetPassword from "./Components/LoginRegister/ResetPassword";

function App() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <BrowserRouter basename="">
  <div className="App">
    <Navbar />
    <div className="content-wrapper">
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <>
              <div className="Menu-container">
                {!Cookies.get("username") ? <LoginRegister /> : <Menu onMenuOpen={() => setMenuActive(true)} />}
              </div>
              {!menuActive && <Homepage />}
            </>
          }
        />
      </Routes>
    </div>
    <Footer />
  </div>
</BrowserRouter>

  );
}
export default App;