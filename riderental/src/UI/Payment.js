// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Replace with your new Stripe public key
// const stripePromise = loadStripe('your-new-publishable-key-here');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePaymentRequest = async (paymentRequest) => {
//     try {
//       const { data: clientSecret } = await axios.post('http://localhost:9093/paymentverification', {
        
//       });

//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: 'https://your-website.com/checkout/complete', // Replace with your return URL
//         },
//       });

//       if (error) {
//         console.error(error.message);
//       }
//     } catch (error) {
//       console.error('Payment failed:', error);
//     }
//   };

//   const paymentRequest = stripe?.paymentRequest({
//     country: 'US',
//     currency: 'usd',
//     total: {
//       label: 'Total',
//       amount: 1099, // Amount in cents
//     },
//     requestPayerName: true,
//     requestPayerEmail: true,
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const { data: clientSecret } = await axios.post('http://localhost:9093/paymentverification', {
        
//       });

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Customer Name',
//           },
//         },
//       });

//       if (error) {
//         console.error(error.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         console.log('Payment successful!');
//       }
//     } catch (error) {
//       console.error('Payment failed:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe}>
//           Pay Now
//         </button>
//       </form>

//       {paymentRequest && (
//         <PaymentRequestButtonElement
//           options={{
//             paymentRequest,
//             style: {
//               paymentRequestButton: {
//                 theme: 'dark',
//                 height: '64px',
//               },
//             },
//           }}
//           onClick={() => handlePaymentRequest(paymentRequest)}
//         />
//       )}
//     </div>
//   );
// };

// export const Payment = () => (
//   <div className="payment-container">
//     <h2>Make Payment</h2>
//     <div className="payment-form-container">
//       <h1>Payment Details</h1>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   </div>
// );
