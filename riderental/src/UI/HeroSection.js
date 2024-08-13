import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import axios from 'axios';



export const HeroSection = () => {
  const [data, setdata] = useState([]);
  const [showmessage, setshowmessage] = useState('Available:');
  const [count, setcount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setcount(prevCount => prevCount - 1)
    }
  }
  const handleIncrement = () => {
    setcount(prevCount => prevCount + 1)

  }

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:9093/bike/allbike');
        if (response.status === 200) {
          setdata(response.data);
          if (response.data.length === 0) {
            setshowmessage('No Data Avialable');
          }
        } else {
          setshowmessage('No Data Available');
          console.log('Not Responding', response.status);
        }
      } catch (error) {
        setshowmessage('Error fetching data');
        console.log('Error in fetching data', error);
      }

    };
    fetchdata();
  }, []);

  return (
    <div className='Herocontainer'>
      <div className='available'><h2>{showmessage}</h2></div>
      <div className='cart-container'>
        {data.length > 0 && data.map((product, index) => (
          <div className='bike-item' key={index}>
            <h3 className='bike-name'>{product.bikeName}</h3>
            <p className='bike-number'>{product.bikeNumber}</p>
            <p className='bike-price'>{product.price} Per/Day</p>
            <div className='booking-section'>
              <p className='days-label'>For How Many Days:</p>
              <div className='count-controls'>
                <input
                  type="button"
                  value="-"
                  onClick={handleDecrement}
                  className="count-button"
                />
                <span className="count-display">{count}</span>
                <input
                  type="button"
                  value="+"
                  onClick={handleIncrement}
                  className="count-button"
                />
              </div>
            </div>
            <input type='button' value='Book' className='book-button' />
          </div>
        ))}
      </div>
    </div>
  );
};
