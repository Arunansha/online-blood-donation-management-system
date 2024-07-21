import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./search.css"
import Home from "./Home"


function Search() {

    const [address, setAddress] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [message, setMessage] = useState('')

    const [alldonors, setAlldonors] = useState([])

    const navigate = useNavigate()


    const getData = async () => {
        const response = await fetch('https://online-blood-backend.onrender.com/getAllDonors');
        const data = await response.json();
        console.log(21, data)
        setAlldonors(data)

    }


    const searchboth = async (val) => {

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
                    const response = await fetch(`https://online-blood-backend.onrender.com/SearchbyBloodgroup/${value}`)
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

            const response = await fetch('https://online-blood-backend.onrender.com/searchboth', requestOptions)
            const data = await response.json();
            setAlldonors(data)
            console.log(data);
        }


    }



    const searchDonor = async (value) => {
        if (value == null || value == "") {
            getData()
        }
        else {
            const response = await fetch(`https://online-blood-backend.onrender.com/searchbyaddress/${value}`)
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
            const response = await fetch(`https://online-blood-backend.onrender.com/SearchbyBloodgroup/${value}`)
            const data1 = await response.json()
            setAlldonors(data1)
        }

    }


    useEffect(() => {
        getData()
    }, [])



    return (
        <>
        <Home></Home>
            <table className="searchtable">

                <tr>
                    <th className="tablehead">Search Donor</th>
                </tr>

                <tr>
                    <td className="search">Select Blood Group <select name="" id="" title="Blood Group" className="bloodgroup" onChange={(e) => searchboth(e.target.value)}>

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
                    <td className="search">Enter Your Location:  <input onChange={(e) => searchboth(e.target.value)} type="search" placeholder="Enter Location" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="button">Search</button>
                    </td>
                </tr>

            </table>

            <h4>
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

            </table>


        </>
    )
}

export default Search