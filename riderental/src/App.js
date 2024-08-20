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
import { Payment } from './UI/Payment';
import { Orderpage } from './Components/Pages/Orderpage';



function App() {
  const[isAuthinacated,setAuthinacated]=useState(false)
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setAuthinacated(authStatus === 'true');
  }, []);
  return (
    <Router>
      <div id="RideRental">
        
        <Routes> 
          <Route path="/" element={<Loginpage setAuthinacated={setAuthinacated} />} />
          <Route path="/home" element={isAuthinacated ? <Home /> : <Loginpage setAuthinacated={setAuthinacated} />} />
          <Route path="/UserProfile" element={isAuthinacated ? <UserProfile /> : <Loginpage setAuthinacated={setAuthinacated} />} /> 
          <Route path='/admin' element={<Supplier/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/bike" element={<Bike />} />
          <Route path="/showbike" element={<ShowBike />} />
          <Route path="/Orderpage" element={<Orderpage />} />
          <Route path="/payment" element={<Payment />} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
