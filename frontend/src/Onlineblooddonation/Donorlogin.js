import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./donorlogin.css"
import Home from "./Home";

function Donorlogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState('')

    const loginDonor = async () => {
        const new_donor = {
            "email": email,
            "password": password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('https://online-blood-backend.onrender.com/loginDonor', requestOptions);
        const data = await response.json();

        if (data.message == true) {
            localStorage.setItem("loggedUser", email)
            setMessage("Login Successfull")
            //navigate to dashboard or home page
            window.location.href = "/home"
        }
        else {
            setMessage("Login Failed")
        }
    }
    const showHide = (id) => {
        if (flag == 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    }


    return (
        <>
            <Home></Home>

            <table className="second">
                <tr className="firstrow">

                    <th className="tablehead">Donor Login</th>

                </tr>

                <br></br>

                <tr>
                    <td className="data1">Enter Email Id <input className="my-input" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="data1">
                        Enter Password

                        {
                            flag == 0 ?
                                <input className="my-input" type="password" name="" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                :
                                <input className="my-input" type="text" name="" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        }
                        {
                            flag == 0 ?
                                <i class="fa-solid fa-eye" onClick={showHide}></i>
                                :
                                <i class="fa-solid fa-eye-slash" onClick={showHide}></i>

                        }
                    </td>
                </tr>

                {/* onchange er kaj likhle sathe sathe niche dekhabe */}

                <tr>
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Login" onClick={loginDonor} /></td>
                </tr>

                <br></br>

                <tr>
                    <td className="data2">
                        New Donor? <Link to="/Donorregister">Register</Link>
                    </td>
                </tr>

                <tr>
                    <td className="data2">
                        Forget Password? <Link to="/Forgotpassworddonor">Click here</Link>
                    </td>
                </tr>

                {message}<br></br>

            </table>

        </>
    )
}

export default Donorlogin