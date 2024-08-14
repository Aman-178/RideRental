import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import axios from 'axios';

export const HeroSection = () => {
  const [data, setData] = useState([]);
  const [showMessage, setShowMessage] = useState('Available:');
  const [quantities, setQuantities] = useState([]);

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
    const formDataToSend = new FormData();
    formDataToSend.append('orignalprice', data[index].price);
    formDataToSend.append('Days', quantities[index]);
    const totalprice = data[index].price * quantities[index];
    formDataToSend.append('totalprice', totalprice);
    formDataToSend.append('bikenumber', data[index].bikeNumber);
    formDataToSend.append('bikename', data[index].bikeName);
    formDataToSend.append('supplierid', data[index].supplier.id);

    try {
      const response = await axios.post('http://localhost:9093/bookingdata/userbook', formDataToSend);
      if (response.status === 201) {
        console.log('Data successfully sent:', response.data);
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className='Herocontainer'>
      <div className='available'><h2>{showMessage}</h2></div>
      <div className='cart-container'>
        {data.length > 0 && data.map((product, index) => (
          <div className='bike-item' key={product.id}> {/* Assuming each product has a unique id */}
            <h3 className='bike-name'>{product.bikeName}</h3>
            <p className='bike-number'>{product.bikeNumber}</p>
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
            onClick={() => senddata(index)}/>
          </div>
        ))}
      </div>
    </div>
  );
};
