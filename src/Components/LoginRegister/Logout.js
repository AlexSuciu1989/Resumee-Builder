import "./Logout.css";
import Cookies from "js-cookie";


function Logout () {

    const cookiesRemove = () => {
        Cookies.remove("username");
        window.location.reload();
    }

    return (
        <button className="logout-button" onClick={cookiesRemove}>Logout</button>
    )
}

export default Logout;