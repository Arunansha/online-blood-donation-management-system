import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Donorlogin from './Onlineblooddonation/Donorlogin';
import Main from './Onlineblooddonation/Main';
import Home from './Onlineblooddonation/Home';
import Donorregister from './Onlineblooddonation/Donorregister';
import ShowDonorInfo from './Onlineblooddonation/ShowDonorInfo'
import EditDonor from './Onlineblooddonation/EditDonor';
import EditUser from './Onlineblooddonation/EditUser';
import Payment from './Onlineblooddonation/Payment';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
   
    {<Main></Main>}
    {/* <Donorregister></Donorregister> */}
    {/* <ShowDonorInfo></ShowDonorInfo> */}
    {/* <EditDonor></EditDonor> */}
    {/* <EditUser></EditUser> */}
    {/* <Login></Login> */}
    {/* <Payment></Payment> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
