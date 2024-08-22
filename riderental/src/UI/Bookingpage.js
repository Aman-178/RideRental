import React from 'react';
import './Bookingpage.css';

export const Bookingpage = () => {
  return (
    <div className='orderConfirmed'>
      
      <table>
        <thead>
          <tr>
            <th>Bike Name</th>
            <th>Bike Number</th>
            <th>Supplier Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mountain Bike</td>
            <td>12345</td>
            <td>BikeWorld</td>
          </tr>
          <tr>
            <td>Road Bike</td>
            <td>67890</td>
            <td>CycleShop</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
