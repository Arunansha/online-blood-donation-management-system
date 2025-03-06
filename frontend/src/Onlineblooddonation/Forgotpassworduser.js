import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./forgotpassworduser.css"
import Navbar from "./Navbar";



function Forgotpassworduser() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [flag, setFlag] = useState(0)
    const [flagtwo, setFlagtwo] = useState(0)
    const [flago, setFlago] = useState(0);
    const [flagc, setFlagc] = useState(0);
    const [otp, setOTP] = useState('')
    const [userOTP, setUserOTP] = useState('')
    const [attempts, setAttempts] = useState(0);
    const [cpassword, setCpasword] = useState('')
    const maxAttempts = 3;

    const [flaga, setFlaga] = useState('')

    // const validateEmail = async () => {
    //     // const x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    //     // setOTP(x)

    //     const new_password = {
    //         "email": email,

    //     }

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(new_password)
    //     };

    //     const response = await fetch('http://localhost:5000/validateEmailUser', requestOptions);
    //     const data = await response.json();

    //     // const response1 = await fetch('http://localhost:5000/send-email', requestOptions);
    //     // const data1 = await response.json();   //eita thik korlam string e convert korlam



    //     if (data.length > 0) {
    //         setEmail(data[0].email)
    //         setFlag(1)

    //     }
    //     else {
    //         setMessage("Sorry Your Email is Not Registered, Try Again")
    //     }

    // }


    const sentpass = async () => {
        const x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        setOTP(x)

        const pass = {
            "email": email,
            "otp": x
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pass)
        };

        const response = await fetch('http://localhost:5000/send-email', requestOptions);
        //const data = await response.json();   //eita thik korlam string e convert korlam
        //console.log(77, data)
        //setMessage(response);
        setFlag(1)

    }

    const checkotp = () => {

        if (userOTP == otp) {
            setFlag(2)
            setMessage("OTP is Correct")
        } else {
            setMessage('Invalid otp')
        }
    }

    const updatePassword = async () => {
        alert("update")
        const new_user = {
            "password": newpassword
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };
        if (newpassword == cpassword) {


            const response = await fetch('http://localhost:5000/updateUserByEmail/' + email, requestOptions);
            const data = await response.json();

            if (data._id != null) {
                setMessage("Password Updated Successfully")
                window.location.href = "./"

            }
            else {
                setMessage("Password Not Updated, Try Again")
            }
        } else {
            setMessage("passowrd and confirm passowrd are same")
        }
    }

    //for otp

    const showHideo = (id) => {
        setFlago(flago === 0 ? 1 : 0);

    }

    const showHide = (id) => {
        setFlaga(flaga == 0 ? 1 : 0);
    }

    const showHidec = (id) => {
        setFlagc(flagc === 0 ? 1 : 0);
    }

    return (

        <>

            <Navbar></Navbar>
            {
                flag == 0 ?

                    <>
                        <table className="passuser">
                            <tr>
                                <th className="headpassuser">Forget Password User</th>
                            </tr>
                            <tr >
                                <td className="rowpassuser">
                                    Enter Email Id<input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} />
                                </td>
                            </tr>
                            {/* 
                            <tr>
                                <td className="buttonpassuser"><input type="Submit" value="Validate" onClick={validateEmail} /></td>
                            </tr> */}
                            <tr>
                                <td className="buttonpassuser"><input type="Submit" value="get otp" onClick={sentpass} /></td>
                            </tr>

                            <tr>
                                <td >{message}</td>
                            </tr>
                        </table>

                    </>
                    : flag == 1 ?
                        <>

                            <table className="passuser">
                                <tr>
                                    <th className="headpassuser">Forget Password User</th>
                                </tr>
                                <tr >
                                    <td className="rowpassuser">
                                        Enter otp<input type="number" name="" placeholder="Enter otp" onChange={(e) => setUserOTP(e.target.value)} />
                                    </td>
                                </tr>
                                {/* {
                                    flagc == 0 ?
                                        <>
                                            <td>
                                                <input type="password" placeholder="Enter your otp" onChange={(e) => setOTP(e.target.value)}></input>
                                            </td>
                                            <td>
                                                <button onClick={showHidec}></button>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>
                                                <input type="password" placeholder="Enter your otp" onChange={(e) => setOTP(e.target.value)}></input>
                                            </td>
                                            <td>
                                                <button onClick={showHidec}></button>
                                            </td>
                                        </>
                                } */
                                }

                                <tr>
                                    <td className="buttonpassuser"><input type="Submit" value="Submit" onClick={checkotp} /></td>
                                </tr>
                                <tr>
                                    <td>{message}</td>
                                </tr>

                            </table>
                        </>
                        :
                        <>
                            <table className="passuserpassword">
                                <tr>
                                    <td>
                                        <input type="password" placeholder="enter your password" onChange={(e) => setNewpassword(e.target.value)}></input>
                                    </td>

                                    <td>
                                        <input type="password" placeholder="Enter your new password" onChange={(e) => setCpasword(e.target.value)} ></input>
                                    </td>


                                    {/* <td>enter new passowrd</td> */}
                                    {/* {
                                        flago == 0 ?
                                            <>
                                                <td>
                                                    <input type="passowrd" placeholder="enter your passowrd" onChange={(e) => setNewpassword(e.target.value)}></input>
                                                </td>
                                                <td><button onClick={showHideo}></button></td>
                                            </>
                                            :
                                            <>
                                                <td>
                                                    <input type="passowrd" placeholder="enter your passowrd" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}></input>
                                                </td>
                                                <td><button onClick={showHideo}></button></td>
                                            </>
                                    } */}
                                </tr>

                                {/* <tr>
                                    <td>confirm your password</td>
                                    {
                                        flaga == 0 ?
                                            <>
                                                <td><input type="passowrd" placeholder="Enter your password" onChange={(e) => setCpasword(e.target.value)} ></input></td>
                                                <td><button onClick={showHide}></button></td>
                                            </> :
                                            <>
                                                <td><input type="passowrd" placeholder="Enter your password" value={cpassword} onChange={(e) => setCpasword(e.target.value)} ></input></td>
                                                <td><button onClick={showHide}></button></td>
                                            </>
                                    }
                                </tr> */}
                                <tr>
                                    <td>
                                        <input type="submit" value="change now" onClick={updatePassword}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{message}</td>
                                </tr>
                            </table>
                        </>

            }


        </>
    )
}

export default Forgotpassworduser