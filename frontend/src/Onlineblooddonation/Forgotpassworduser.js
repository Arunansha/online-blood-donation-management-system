import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./forgotpassworduser.css"
import Home from "./Home";


function Forgotpassworduser() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [flag, setFlag] = useState(0)

    const validateEmail = async () => {
        const new_password = {
            "email": email,

        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_password)
        };

        const response = await fetch('https://online-blood-backend.onrender.com/validateEmailUser', requestOptions);
        const data = await response.json();

        if (data.length > 0) {
            setEmail(data[0].email)
            setFlag(1)

        }
        else {
            setMessage("Sorry Your Email is Not Registered, Try Again")
        }

    }

    const sentpass = async () => {
        const pass = {
            "email": email
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pass)
        };

        const response = fetch('https://online-blood-backend.onrender.com/send-email', requestOptions);
        const data = response;
        setMessage(data);

    }

    // const updatePassword = async () => {
    //     alert("update")
    //     const new_user = {
    //         "password": newpassword
    //     }

    //     const requestOptions = {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(new_user)
    //     };

    //     const response = await fetch('http://localhost:5000/updateUserByEmail/' + email, requestOptions);
    //     const data = await response.json();

    //     if (data._id != null) {
    //         setMessage("Password Updated Successfully")
    //         window.location.href="./"

    //     }
    //     else {
    //         setMessage("Password Not Updated, Try Again")
    //     }
    // }


    return (
        <>
            <Home></Home>
            {/* {
                flag == 0 ? */}
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

                    <tr>
                        <td className="buttonpassuser"><input type="Submit" value="Submit" onClick={validateEmail} /></td>
                    </tr>
                    <tr>
                        <td className="buttonpassuser"><input type="Submit" value="get otp" onClick={sentpass} /></td>
                    </tr>

                    <tr>
                        <td >{message}</td>
                    </tr>


                </table>
            </>
            {/* // :
                    // <>

                    //     <table className="passuser">
                    //         <tr>
                    //             <th className="headpassuser">Forget Password User</th>
                    //         </tr>
                    //         <tr >
                    //             <td className="rowpassuser">
                    //                 Enter Email Id<input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} />
                    //             </td>
                    //         </tr>

                    //         <tr>
                    //             <td className="buttonpassuser"><input type="Submit" value="Submit" onClick={validateEmail} /></td>
                    //         </tr>

                    //     </table>


                    //     <table className="passuserpassword">
                    //         <tr>
                    //             <td className="rowpassuser">
                    //                 Enter new password
                    //                 <input type="password" name="" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)} />
                    //             </td>
                    //         </tr>

                    //         <tr>
                    //             <td className="buttonpassuser"><input type="Submit" value="Change now" onClick={updatePassword} /></td>
                    //         </tr>
                    //         <tr>
                                <td >{message}</td>
                             </tr>
                         </table>
                     </>
           } */}

        </>
    )
}


export default Forgotpassworduser