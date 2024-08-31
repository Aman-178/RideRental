import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { Spinner } from './Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import {Geolocation} from './GeoLocation'


export const HeroSection = () => {
  const [data, setData] = useState([]);
  const [showMessage, setShowMessage] = useState('Available:');
  const [quantities, setQuantities] = useState([]);
  const [loading, setloading] = useState('')
  const [BookingId, setBookingId] = useState('');
  const [status, setStatus] = useState('')
  const[BookingMessage,setBookingMessage]=useState('')
  const [checkdata,setcheckdata]=useState(false)
  const { user, updateUser } = useContext(UserContext);
  // Handle increment for specific index
  const handleIncrement = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
  };

  // Handle decrement for specific index
  const handleDecrement = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((quantity, i) => (i === index && quantity > 1 ? quantity - 1 : quantity))
    );
  };

  const navigate = useNavigate();
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9093/bike/allbike');
        if (response.status === 200) {
          setData(response.data);
          setQuantities(Array(response.data.length).fill(1));
          if (response.data.length === 0) {
            setShowMessage('No Data Available');
          }
        } else {
          setShowMessage('No Data Available');
          console.log('Not Responding', response.status);
        }
      } catch (error) {
        setShowMessage('Error fetching data');
        console.log('Error in fetching data', error);
      }
    };

    fetchData();
  }, []);
   
  const senddata = async (index) => {
    //Sending Requset for Booking.
    const formDataToSend = new FormData();
    formDataToSend.append('orignalprice', data[index].price);
    formDataToSend.append('Days', quantities[index]);
    const totalprice= data[index].price * quantities[index];
    formDataToSend.append('totalprice', totalprice);
    formDataToSend.append('bikenumber', data[index].bikeNumber);
    formDataToSend.append('bikename', data[index].bikeName);
    formDataToSend.append('supplierid', data[index].supplier.id);
    formDataToSend.append('username',user.fullname);
    formDataToSend.append('mobomo',user.mobno);
    try {
      const response = await axios.post('http://localhost:9093/bookingdata/userbook', formDataToSend);
      if (response.status === 201) {
        setBookingId(response.data.id);
        localStorage.setItem('totalprice', totalprice);
        console.log('Data successfully sent:', response.data.id, BookingId);
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }



  };

  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      if (!BookingId) return;

      try {
        const response = await axios.get('http://localhost:9093/bookingdata/statusbooking', {
          params: { id: BookingId }
        });
        if (response.status === 200) {
          setStatus(response.data);
          console.log('Booking status:', response.data);

          // Start polling if status is 'Wait'
          if (response.data === 'Wait') {
            intervalId = setInterval(async () => {
              try {
                const pollResponse = await axios.get('http://localhost:9093/bookingdata/statusbooking', {
                  params: { id: BookingId }
                });
                if (pollResponse.status === 200) {
                  setStatus(pollResponse.data);
                  setloading(true);
                  console.log('Polling status:', pollResponse.data);

                  // Stop polling if status is no longer 'Wait'
                  if (pollResponse.data !== 'Wait') {
                    clearInterval(intervalId);
                    setloading(false);
                    
                  }
                }
              } catch (error) {
                console.error('Error fetching booking status during polling:', error);
              }
            }, 1000); // Poll every 1 seconds
          }
        }
      } catch (error) {
        console.error('Error fetching booking status:', error);
      }
    };

    fetchStatus();


    return () => clearInterval(intervalId);
  }, [BookingId]);

  // Handle status changes
  useEffect(() => {
    if (status === 'Accept') {
      navigate('/payment');
      console.log('Booking accepted');
    } else if (status === 'Decline') {
       setBookingMessage('This Supplier Not Accepting This Time !')
      console.log('Booking declned');
    }
  }, [status]);

  if (loading) return <Spinner></Spinner>;

 

  return (
    <div className='Herocontainer'>
      <div className='available'><h2>{showMessage}</h2></div>
       <Geolocation></Geolocation>
      <div className='cart-container'>
        {data.length > 0 && data.map((product, index) => (
          <div className='bike-item' key={product.id}> {/* Assuming each product has a unique id */}
        
            <h3 className='bike-name'>{product.bikeName}</h3>
            <p className='bike-number'>{product.bikeNumber}</p>
            <p className='supplierAddress'>{product.supplier.address}</p>
            <p className='supplierAddress'>{product.supplier.shopownername}</p>
            <p className='bike-price'>{product.price} Per/Day</p>
            <div className='booking-section'>
              <p className='days-label'>For How Many Days:</p>
              <div className='count-controls'>
                <input
                  type="button"
                  value="-"
                  onClick={() => handleDecrement(index)}
                  className="count-button"
                />
                <span className="count-display">{quantities[index]}</span>
                <input
                  type="button"
                  value="+"
                  onClick={() => handleIncrement(index)}
                  className="count-button"
                />
              </div>
            </div>
            <input type='button' value='Book' className='book-button'
              onClick={() => senddata(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};
