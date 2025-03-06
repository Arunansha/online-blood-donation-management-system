import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./editdonor.css"
import Home from "./Home";
import Navbar from "./Navbar";
import profileimage from "./images.jpeg"

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
    const [flagone, setFlagone] = useState('')

    const [alldonors, setAlldonors] = useState([])
    const [image, setImage] = useState('')
    const [image_id, setImage_id] = useState('')


    const location = useLocation()

    const getData = async () => {
        const email = localStorage.getItem('loggedDonor')
        const response = await fetch('http://localhost:5000/getDonorsByEmail/' + email);
        const data = await response.json();
        setAlldonors(data)
    }


    useEffect(() => {
        getData()
    }, [])


    const deleteimage = async (e) => {
        const product = {
            "image": " ",
            "image_id": " "
        }

        console.log(product)

        const did = alldonors[0]._id;

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }

        const response = await fetch(`http://localhost:5000/updateDonor/${did}`, requestOptions);
        const data = await response.json();

        if (data._id != null) {
            window.location.href = "/EditDonor"
        }

    };




    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tmbowxdm'); // Replace 'your_upload_preset' with your actual upload preset

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dtcbg9f0e/image/upload', //replace with cloudinary cloud name
                formData
            );

            console.log("response: ", res.data)

            setImage(res.data.secure_url);
            setImage_id(res.data.public_id);

            const did = alldonors[0]._id;

            const product = {
                "image": res.data.secure_url,
                "image_id": res.data.public_id
            }

            console.log(product)


            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            };

            const response = await fetch(`http://localhost:5000/updateDonor/${did}`, requestOptions);
            const data = await response.json();

            if (data._id != null) {
                window.location.href = "/EditDonor"
            }

        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

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


    useEffect(() => {    //eita upore dile jhar khabe
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

    useEffect(() => {
        if (image_id == null) {
            setFlagone(1)
        }
    }, [])

    return (
        <>

            <Navbar></Navbar>
            <table className="edittable">

                <tr>
                    <th className="tablehead"> Edit Donor</th>
                </tr>
                {
                    alldonors.map((data) =>
                        <div className="profile">

                            {data.image == null || data.image == " " ? (
                                <img className="profileimage" src={profileimage} alt="Donor Profile Img" />
                            ) : (
                                <img className="profileimage" src={data.image} alt="Default Donor Profile Img" />
                            )}

                            <button onClick={deleteimage}>Delete</button>
                            <input className="profilephotoinput" type="file" onChange={handleImageUpload}></input>
                        </div>

                    )
                }
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