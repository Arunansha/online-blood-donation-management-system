import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { link } from "react-router-dom"
import axios from 'axios';
import "./profile.css"

function DonorProfile() {
    const [alldonors, setAlldonors] = useState([])
    const[image, setImage]=useState('')
    const[image_id, setImage_id]=useState('')

    const navigate=useNavigate();

    const getData = async () => {
        const email = localStorage.getItem('loggedDonor')
        const response = await fetch('http://localhost:5000/getDonorsByEmail/' + email);
        const data = await response.json();
        setAlldonors(data)
    }

    useEffect(() => {
        getData()
    }, [])


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
                window.location.href = "/DonorProfile"
            }

        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };


    return (
        <>
        {
            alldonors.map((data) =>
            <div className="profile">
                <img className="profileimage" src={data.image} alt="Donor Profile Img" />


                <input className="profilephotoinput" type="file" onChange={handleImageUpload}></input>
            </div>
            )
        }

        </>
    )


}
export default DonorProfile