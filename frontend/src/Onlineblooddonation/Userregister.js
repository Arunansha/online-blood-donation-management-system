import { useState } from "react"
import "./userregister.css"
import Home from "./Home"

function Userregister() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState(0)

    const registerUser = async () => {
        const new_User = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "gender": gender,
            "dob": dob
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_User)
        };

        const response = await fetch('https://online-blood-backend.onrender.com/registerUser', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("User Registration Successfully")
        }
        else {
            setMessage("Registraion Failed")
        }
    }

    const showHide = (id) => {
        if (flag == 0) {
            setFlag(1)
        } else {
            setFlag(0)
        }
    }

    return (
        <>
            <Home></Home>

            <table className="userregister">

                <tr>
                    <th className="tablehead">User Registration</th>
                </tr>

                <tr>
                    <td className="userdata">Enter Your Name <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="userdata">Enter Email Id <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="userdata">Enter Password

                        {
                            flag == 0 ?
                                <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                :
                                <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                        }
                        {
                            flag == 0 ?
                                <i class="fa-solid fa-eye" onClick={showHide}></i>
                                :
                                <i class="fa-solid fa-eye-slash" onClick={showHide}></i>

                        }


                    </td>
                </tr>

                <tr>
                    <td className="userdata">Enter Your Address <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="userdata">Enter Your Phone No <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="userdata">Enter Your DOB <input type="date" name="" onChange={(e) => setDob(e.target.value)} /></td>
                </tr>

                <tr>

                    <td className="userdata">Select Gender  <select name="" id="" title="Gender" onChange={(e) => setGender(e.target.value)}>

                        <option >Select</option>
                        <option >Male</option>
                        <option >Female</option>
                        <option >Others</option>

                    </select>
                    </td>
                </tr>

                <tr>
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Register" onClick={registerUser} /></td>
                </tr>

                <tr>
                    <td className="register">
                        {message}
                    </td>
                </tr>

                <br></br>

            </table>

        </>
    )
}

export default Userregister