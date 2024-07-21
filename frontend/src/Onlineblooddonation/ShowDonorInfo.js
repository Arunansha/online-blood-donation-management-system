import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./showdonorinfo.css"
import Home from "./Home"


function ShowDonorInfo() {

  const [alldonors, setAlldonors] = useState([])

  const navigate = useNavigate()


  const getData = async () => {
    const response = await fetch('https://online-blood-backend.onrender.com/getAllDonors');
    const data = await response.json();
    setAlldonors(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const editDonor = (id) => {
    navigate('/EditDonor', { state: { "id": id } });
  }

  const deleteDonor = async (id) => {

    if (window.confirm("are you sure want to delete?")); {

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, //header er modhe json dite hobe

      };
      const response = await fetch(`https://online-blood-backend.onrender.com/delete/${id}`, requestOptions);


      alert("deleted successfully")

      window.location.reload();
    }
  }
  return (
    <>
    <Home></Home>
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
            <th className="head" scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {
            alldonors.map((data, index) =>
              <tr>
                <th className="first" scope="row">{index + 1}</th>
                <td classNamce="first">{data.name}</td>
                <td className="first">{data.email}</td>
                <td className="first">{data.password}</td>
                <td className="first">{data.address}</td>
                <td className="first">{data.contact}</td>
                <td className="first">{data.bloodgroup}</td>
                <td className="first">
                  <button onClick={(e) => editDonor(data._id)}>Edit</button>
                  <button onClick={(e) => deleteDonor(data._id)}>Delete</button>
                </td>
              </tr>
            )
          }

        </tbody>

      </table>

    </>
  )
}

export default ShowDonorInfo