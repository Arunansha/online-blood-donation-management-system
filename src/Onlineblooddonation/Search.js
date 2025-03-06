import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./search.css"
import Navbar from "./Navbar"

function Search() {

    const [address, setAddress] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [message, setMessage] = useState('')

    const [userid, setUserid] = useState('')
    const [donorid, setDonorid] = useState('')
    const [donatedate, setDonatedate] = useState('')
    const [status, setStatus] = useState('')

    const [alldonors, setAlldonors] = useState([])

    const navigate = useNavigate()

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();


    const getData = async () => {
        const response = await fetch('http://localhost:5000/getAllDonors');
        const data = await response.json();
        console.log(21, data)
        setAlldonors(data)


    }

    // const showTodaysDate = () => {
    //     const today = new Date();
    //     alert(today.toISOString().split('T')[0].replace(/-/g, '/'));
    // }

    const searchboth = async (val) => {
        // const data1 =showTodaysDate();

        setAddress(val)        // address ta ke set korar jonno nich theke tolar por

        if (val == null || val == "") {
            getData()

        }

        else {
            const searchbyBloodgroup = async (value) => {
                setBloodGroup(value) //bloodgroup ta ke set korar jonno value ta nich theke tolar por
                if (value == null || value == "") {
                    getData()
                }

                else {
                    const response = await fetch(`http://localhost:5000/SearchbyBloodgroup/${value}`)
                    const data1 = await response.json()
                    setAlldonors(data1)
                }

            }

            const search_donor = {

                "address": address,
                "bloodgroup": bloodgroup
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(search_donor)
            };

            console.log(address)
            console.log(bloodgroup)

            const response = await fetch('http://localhost:5000/searchboth', requestOptions)
            const data = await response.json();
            setAlldonors(data)
            console.log(data);

            if (data.length == 0) {
                setMessage('no donors')
            }

        }

    }


    const searchDonor = async (value) => {
        if (value == null || value == "") {
            getData()
        }
        else {
            const response = await fetch(`http://localhost:5000/searchbyaddress/${value}`)
            const data1 = await response.json()
            setAlldonors(data1)
        }
    }


    const searchbyBloodgroup = async (value) => {
        setBloodGroup(value) //bloodgroup ta ke set korar jonno value ta nich theke tolar por
        if (value == null || value == "") {
            getData()
        }

        else {
            const response = await fetch(`http://localhost:5000/SearchbyBloodgroup/${value}`)
            const data1 = await response.json()
            setAlldonors(data1)
        }

    }



    // useEffect(() => { first time page hit korle jeta dakhabe
    //     getData()
    // }, [])

    const handleRequestBlood = async (donor) => {
        // Check if the user is logged in
        const loggedInUser = localStorage.getItem("loggedUser");
        if (loggedInUser) {
            const userid = localStorage.getItem('loggedUser')
            console.log(148, donor)

            const new_User = {
                "userid": userid,
                "donorid": donor.email,
                "donatedate": donatedate

            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_User)
            };

            const response = await fetch('http://localhost:5000/checkRequest', requestOptions);
            const data = await response.json();

            if (data.length == 0) {
                alert(`request from user:${userid}`);
                alert(`request to donor:${donor.email}`);
                alert(`donate date:${donatedate}`);

                const response1 = await fetch('http://localhost:5000/requestblood', requestOptions);
                const data1 = await response1.json();

                if (data._id != null) {
                    setMessage("Donation details")
                }
                else {
                    setMessage("No details")
                }
            }

            else {
                setMessage("cannot sent")
                alert('already sent on this date');
            }
        }

        else {
            alert("Please login first")
            window.location.href = "/Userlogin"
        }


    };

    //     if (loggedInUser) {
    //         // If logged in, handle the request logic (can show an alert or proceed with the API call)
    //         alert(`Request sent to donor: ${donor.name}`);
    //     } else {
    //         // If not logged in, prompt the user to log in
    //         alert("Please log in to request blood.");
    //         navigate("/Userlogin"); // Redirect to the login page
    //     }
    // }


    return (
        <>
            <Navbar></Navbar>
            <table className="searchtableone">

                <tr>
                    <th className="tablehead">Search Donor</th>
                </tr>

                <tr>
                    <td className="search">Select Blood Group <select name="" id="" title="Blood Group" className="bloodgroup" onChange={(e) => setBloodGroup(e.target.value)}>

                        <option >Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>

                    </select>
                    </td>
                </tr>

                <tr>
                    <td className="search">Enter Your Location:  <input type="search" placeholder="Enter Location" onChange={(e) => setAddress(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="buttonsearch" onClick={searchboth}>Search</button>
                    </td>
                </tr>

            </table>

            {/* <div>
                {
                alldonors.map((data,index)=>
                <span className="divcard">
                    <p>{data.name}</p>
                    <p>{data.address}</p>
                    <p>{data.contact}</p>
                    <p>{data.bloodgroup}</p>
                </span>
                )
            }
            </div> */}


            <div className="card-container">
                {alldonors.length > 0 ? (
                    alldonors.map((data, index) => (
                        <div key={index} className="card">
                            <div className="card-header">
                                <h3>{data.name}</h3>
                            </div>
                            <div className="card-body">
                                <p className="content"><strong>Email:</strong> {data.email}</p>
                                <p className="content"><strong>Contact:</strong> {data.contact}</p>
                                <p className="content"><strong>Blood Group:</strong> {data.bloodgroup}</p>
                                <p className="content"><strong>Address:</strong> {data.address}</p>
                                <p className="content"><strong>Select date:
                                    <input type="date" onChange={(e) => setDonatedate(e.target.value)} min={currentDate}></input>
                                </strong></p>
                            </div>
                            <buton className="btn" onClick={() => handleRequestBlood(data)}>
                                Request</buton>
                        </div>
                    ))
                ) :
                    (
                        <p>{message}</p>
                    )}
            </div>




            {/* <h4>
                Donor's list
            </h4>

            <table class="table">

                <thead>

                    <tr>
                        <th className="head" scope="col">Sl. No</th>
                        <th className="head" scope="col">Name</th>
                        <th className="head" scope="col">Email</th>
                        <th className="head" scope="col">Password</th>
                        <th className="head" scope="col">Address</th>
                        <th className="head" scope="col">Contact</th>
                        <th className="head" scope="col">Bloodgroup</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        alldonors.map((data, index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td className="first">{data.name}</td>
                                <td className="first">{data.email}</td>
                                <td className="first">{data.password}</td>
                                <td className="first">{data.address}</td>
                                <td className="first">{data.contact}</td>
                                <td className="first">{data.bloodgroup}</td>

                            </tr>
                        )
                    }

                </tbody>

            </table> */}


        </>
    )
}

export default Search