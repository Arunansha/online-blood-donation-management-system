import { useState } from "react"
import "./donorregister.css"
import Home from "./Home"

function Donorregister() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState(0)

    const registerDonor = async () => {
        const new_donor = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "bloodgroup": bloodgroup,
            "gender": gender,
            "dob": dob
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('https://online-blood-backend.onrender.com/registerDonor', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("Donor Registration Successfully")
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

            <table className="registertable">

                <tr>
                    <th className="tablehead">Donor Registration</th>
                </tr>

                <tr>
                    <td className="register">Enter Your Name <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="register">Enter Email Id <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="register">
                        Enter Password
                        {
                            flag == 0 ?
                            
                                <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                
                                :
                                <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        }
                        {
                            flag==0?
                            <i class="fa-solid fa-eye" onClick={showHide}></i>
                                :
                                <i class="fa-solid fa-eye-slash" onClick={showHide}></i>

                            }
                        
                        


                    </td>
                </tr>

                <tr>
                    <td className="register">Enter Your Address <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>

                <tr>
                    <td className="register">Enter Your Phone No <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} /></td>
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
                    <td className="register">Enter Your dob<input type="date" name="" placeholder="Enter dob" onChange={(e) => setDob(e.target.value)} /></td>
                </tr>


                <tr>

                    <td className="register">Select Blood Group  <select name="" id="" title="Blood Group" onChange={(e) => setBloodGroup(e.target.value)}>

                        <option >Select</option>
                        <option >A+</option>
                        <option >A-</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >o+</option>
                        <option >o-</option>

                    </select>
                    </td>

                </tr>

                <tr >
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Register" onClick={registerDonor} /></td>
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

export default Donorregister