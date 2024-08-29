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
import { useEffect, useState } from 'react';
import { Supplier } from './Components/Supplier';
import { Orderpage } from './Components/Pages/Orderpage';
import { Bookingpage } from './UI/Bookingpage';
import {Payment} from './UI/Payment'
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function App() {
  const[isAuthinacated,setAuthinacated]=useState(false)
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setAuthinacated(authStatus === 'true');
  }, []);
  const showToast = (message, duration = 3000) => {
    Toastify({
      text: message,
      duration: duration,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true
    }).showToast();
  };
  return (
    <Router>
      <div id="RideRental">
        
        <Routes> 
          <Route path="/" element={<Loginpage showToast={showToast} setAuthinacated={setAuthinacated} />} />
          <Route path="/home" element={isAuthinacated ? <Home showToast={showToast} /> : <Loginpage showToast={showToast} setAuthinacated={setAuthinacated} />} />
          <Route path="/UserProfile" element={isAuthinacated ? <UserProfile /> : <Loginpage setAuthinacated={setAuthinacated} />} /> 
          <Route path='/supplier' element={<Supplier/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/bike" element={<Bike />} />
          <Route path="/showbike" element={<ShowBike />} />
          <Route path="/Orderpage" element={<Orderpage />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/bookingpage" element={<Bookingpage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
