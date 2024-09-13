import "./App.css";
import Menu from "./Components/Menu/Menu";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Cookies from "js-cookie";
import Homepage from "./Components/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Menu-container">
        {!Cookies.get("username") ? <LoginRegister /> : <Menu />}
      </div>
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
