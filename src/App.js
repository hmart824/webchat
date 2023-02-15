import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Sidepage from './components/Sidepage';
import Chatcontainer from './components/Chatcontainer';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Loginpage from './components/Loginpage';
import { auth } from './firebase';

function App() {
  const signOut = ()=>{
    auth.signOut()
    .then(()=>{
      setUser(null);
      localStorage.removeItem("user");
    })
    .catch((err)=>{alert(err.message)})
  }


  const newUser =  JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(newUser); 
  const [mode, setMode] = useState("light");

  const toggleMode = ()=>{
    if(mode==="light"){
      setMode("dark");
    }
    else{
      setMode("light");
    }
  }
  return (
    <>{
      user ? (
      <div className="app">
        <Router>
          <div className="app-container">
          <Sidepage currentUser={user} signOut={signOut}/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/:chatUserEmail" element={<Chatcontainer currentUser={user}/>}/>
            </Routes>
          </div>
        </Router>

      </div>
      
            ) : (<Loginpage setUser={setUser}/>)
      }
    </>
  );
}

export default App;
