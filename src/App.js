import './App.css';
import Menu from './Components/Menu/Menu';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import DisplayUsername from './Components/LoginRegister/DisplayUsername';
import Cookies from 'js-cookie';

function App() {

  return (
    <div className="App">
      <div className='Menu-container'>
        {(!Cookies.get("username") ? 
        <LoginRegister/> : <Menu/>)}
          
        <DisplayUsername username={Cookies.get('username')}/>
      </div>
    </div>
  );
}

export default App;
