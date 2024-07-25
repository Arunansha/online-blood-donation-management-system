import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./userlogin.css"

import Home from "./Home";

function Userlogin() {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState(0)

    const loginUser = async () => {
        const new_user = {
            "email": email,
            "password": password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('https://online-blood-donation-backend.onrender.com/loginUser', requestOptions);
        const data = await response.json();

        if (data.message == true) {
            localStorage.setItem("loggedUser", email)
            setMessage("Login Successfull")
            //navigate to dashboard or home page
            navigate("/home")
            //window.location.href = "https://online-blood-donation-frontend.onrender.com/home"
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
            <table className="user">
                <tr>

                    <th className="tableheaduser">User Login</th>

                </tr>

                <br></br>

                <tr>
                    <td className="user1" >Enter Email Id <input className="my-input" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <tr>

                    <td className="user1">

                        Enter Password

                        {
                            flag == 0 ?

                                <input className="my-input" type="password" name="" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                :
                                <input className="my-input" type="text" name="" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

                        }
                        {
                            flag == 0 ?
                                <i class="fa-solid fa-eye-slash" onClick={showHide}></i>
                                :
                                <i class="fa-solid fa-eye" onClick={showHide}></i>

                        }

                    </td>


                </tr>

                {/* onchange er kaj likhle sathe sathe niche dekhabe */}

                <tr >
                    <td className="registrationSwitchuser"><input className="registrationSwitchin" type="Submit" value="Login" onClick={loginUser} /></td>
                </tr>

                <br></br>

                <tr>
                    <td className="data3">
                        New User? <Link to="/Userregister">Register</Link>
                    </td>
                </tr>

                <tr>
                    <td className="data3">
                        Forget Password? <Link to="/Forgotpassworduser">Click here</Link>
                    </td>
                </tr>

                <tr>
                    <td>{message}</td>
                </tr>


            </table>

        </>
    )
}

export default Userlogin
