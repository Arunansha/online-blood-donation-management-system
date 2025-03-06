import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./showdonorinfo.css"
import Home from "./Home"
import Navbar from "./Navbar"


function AcceptReject() {
    const [id, setId] = useState('')
    const [alldonors, setAlldonors] = useState([])



    const getData = async () => {
        const donorid = localStorage.getItem('loggedDonor')
        console.log(16, donorid)
        const response = await fetch('http://localhost:5000/getAllRequestByDonorId/' + donorid)
        const data = await response.json();
        setAlldonors(data);
        console.log(19, data)
    }

    const acceptstatus = async (reqid) => {

        const newdata = { "status": "Accept" }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newdata)
        };

        const response = await fetch(`http://localhost:5000/updateStatus/${reqid}`, requestOptions)
        // const data = await response.json();
        window.location.href = ""

    }


    const rejectstatus = async (reqid) => {

        const newdata = { "status": "Reject" }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newdata)
        };

        const response = await fetch(`http://localhost:5000/updateStatus/${reqid}`, requestOptions)
        // const data = await response.json();
        window.location.href = ""

    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <h4 className="heading">
                Blood Request
            </h4>
            <table class="table">
                <thead>
                    <tr>
                        <th className="head" scope="col">Sl. No</th>
                        <th className="head" scope="col">Recipient Name</th>
                        <th className="head" scope="col">Recipient Number</th>
                        <th className="head" scope="col">Recipient Address</th>
                        <th className="head" scope="col">Recipient Email</th>
                        <th className="head" scope="col">Receipt Date</th>
                        <th className="head" scope="col">Recipient Bloodgroup</th>
                        <th className="head" scope="col">Status</th>
                    </tr>
                </thead>

                {/* <tbody>
                    {
                        alldonors.map((data, index) =>
                            <tr>
                                <th className="first" scope="row">{index + 1}</th>
                                <td classNamce="first">{data.name}</td>
                                <td className="first">{data.contact}</td>
                                <td className="first">{data.address}</td>
                                <td className="first">{data.email}</td>
                                <td className="first">{data.donatedate}</td>
                                <td className="first">{data.bloodgroup}</td>
                                if(data.status === "Pending")
                                {
                                    <td className="first">
                                        <button onClick={acceptstatus}>Accept</button>
                                        <button onClick >Reject</button>
                                    </td>
                                }
                                else{
                                    <td className="first">{data.status}</td>
                                }
                                
                            </tr>
                        )
                    }

                </tbody> */}

                <tbody>
                    {
                        alldonors.map((data, index) => (
                            <tr key={index}>
                                <th className="first" scope="row">{index + 1}</th>
                                <td className="first">{data.name}</td>
                                <td className="first">{data.contact}</td>
                                <td className="first">{data.address}</td>
                                <td className="first">{data.email}</td>
                                <td className="first">{data.donatedate}</td>
                                <td className="first">{data.bloodgroup}</td>
                                <td className="first">
                                    {data.status === "pending" ? (
                                        <>
                                            <button onClick={(e)=>acceptstatus(data.reqid)}>Accept</button>
                                            <button onClick={(e)=>rejectstatus(data.reqid)}>Reject</button>
                                        </>
                                    ) : (
                                        data.status
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>


            </table>

        </>
    )
}

export default AcceptReject