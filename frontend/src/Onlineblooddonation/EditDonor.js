import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./editdonor.css"
import Home from "./Home";

function EditDonor() {
    const [id, setId] = useState('')
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


    const location = useLocation()

    const registerDonor = async () => {
        const new_donor = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "bloodgroup": bloodgroup,
            "dob": dob,
            "gender": gender
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch(`http://localhost:5000/updateDonor/${id}`, requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("Donor Updated Successfully")
        }
        else {
            setMessage("Update Failed")
        }
    }

    const getDatabyId = async (id) => {
        const response = await fetch('http://localhost:5000/getDonorsbyId/' + id)
        const data = await response.json();
        setName(data.name)
        setPassword(data.password)
        setAddress(data.address)
        setPhoneno(data.contact)
        setEmail(data.email)
        setBloodGroup(data.bloodgroup)
        setDob(data.dob)
        setGender(data.gender)
    }

    useEffect(() => {
        const id = location.state.id;
        console.log(48, id)
        setId(id)
        getDatabyId(id)
    }, [])

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
            <table className="edittable">

                <tr>
                    <th className="tablehead"> Edit Donor</th>
                </tr>

                <tr>
                    <td className="editrow">Enter Your Name <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} /></td>
                </tr>

                <tr>
                    <td className="editrow">Enter Email Id <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} value={email} /></td>
                </tr>

                {/* <tr>
                    <td className="editrow">
                        Enter Password
                        {
                            flag == 0 ?
                                <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                :
                                <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        }
                       {
                            flag==0?
                            <i class="fa-solid fa-eye" onClick={showHide}></i>
                                :
                                <i class="fa-solid fa-eye-slash" onClick={showHide}></i>

                            }
                    </td>
                </tr> */}

                <tr>
                    <td className="editrow">Enter Your Address <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} value={address} /></td>
                </tr>

                <tr>
                    <td className="editrow">Enter Your Phone No <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} value={phoneno} /></td>
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
                    <td className="register">Enter Your dob<input type="date" name="" placeholder="Enter Phone No" onChange={(e) => setDob(e.target.value)} /></td>
                </tr>

                <tr>

                    <td className="editrow">Select Blood Group  <select name="" id="" title="Blood Group" onChange={(e) => setBloodGroup(e.target.value)} value={bloodgroup}>

                        <option >Select</option>
                        <option >A+</option>
                        <option >A-</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >O+</option>
                        <option >O-</option>

                    </select>
                    </td>

                </tr>

                <tr >
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Update" onClick={registerDonor} /></td>
                </tr>

                <tr>
                    <td>{message}</td>
                </tr>



            </table>
        </>
    )
}
export default EditDonor