import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './Components/Signup';
import { Login } from './Components/Pages/Login';
import { MyProfile } from './Components/Pages/Myprofile';
import { Bike } from './Components/Pages/Bike';
import { ShowBike } from './Components/Pages/ShowBike';
import { Loginpage } from './UI/Loginpage';
import { Home } from './UI/Home';
import { UserProfile } from './UI/UserProfile';
import { useState } from 'react';
import { Supplier } from './Components/Supplier';

function App() {
  const[isAuthinacted,setAuthinacated]=useState(false)
  
  return (
    <Router>
      <div id="RideRental">

        <Routes>
          <Route path='/admin' element={<Supplier/>}></Route>
          {/* <Route path="/" element={<Loginpage  setAuthinacated={setAuthinacated}/>} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/bike" element={<Bike />} />
          <Route path="/showbike" element={<ShowBike />} />
          {/* <Route path="/home" element={isAuthinacted?<Home />:<Loginpage/>} />
          <Route path="/UserProfile" element={isAuthinacted?<UserProfile />:<Loginpage/>} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
