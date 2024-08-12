import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Signup } from './Components/Signup';
import { Login } from './Components/Pages/Login';
import { MyProfile } from './Components/Pages/Myprofile';
import    {Bike}  from  './Components/Pages/Bike';
import { ShowBike } from './Components/Pages/ShowBike';
function App() {
  return (
    <Router>
      <div id="RideRental">
        <Navbar />
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route  path="/bike" element={<Bike/>}  />
            <Route  path="/showbike" element={<ShowBike/>}  />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
