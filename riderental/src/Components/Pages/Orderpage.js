import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orderpage.css'
export const Orderpage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('supplierId');

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9093/bookingdata', {
                    params: {
                        supplierid: id
                    }
                });
                if (response.status === 200) {
                    setData(response.data);
                    console.log(response.data); // Log the data received
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter data based on the status
    const filterdata = data.filter(order => order.status === "successfull");

    return (
        <div className='ConfirmOrder-Container'>
            <h2>Confirm Order Recceived Page</h2>
            <div>

                {filterdata.length > 0 ? (
                      <table>
                      <thead>
                          <tr>
                              <th>Customer Name:</th>
                              <th>Customer ContactNo:</th>
                              <th>Customer Address:</th>
                              <th>Bike Name:</th>
                              <th>Orignal Price:</th>
                              <th>Total Price:</th>
                              <th>Total Days:</th>
                              <th>Payment Status:</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filterdata.map((order, index) => (
                              <tr key={index}>
                                  <td>{order.username}</td>
                                  <td>{order.mobomo}</td>
                                  <td>{order.address}</td>
                                  <td>{order.bikename}</td>
                                  <td>{order.orignalprice}</td>
                                  <td>{order.totalprice}</td>
                                  <td>{order.days}</td>
                                  <td>{order.status}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                ) : (
                    <p>No Any Confirm Orders you Recceived.</p>
                )}
            </div>
        </div>
    );
};
