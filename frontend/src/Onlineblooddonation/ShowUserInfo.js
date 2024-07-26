import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./showuserinfo.css"
import Home from "./Home"


function ShowUserInfo() {

  const [allusers, setAllusers] = useState([])

  const navigate = useNavigate()


  const getData = async () => {
    const email = localStorage.getItem('loggedUser')
    const response = await fetch('https://online-blood-donation-backend.onrender.com/getUsersByEmail'+email);
    const data = await response.json();
    setAllusers(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const editUser = (id) => {
    navigate('/EditUser', { state: { "id": id } });
  }

  const deleteUser = async (id) => {

    if (window.confirm("are you sure want to delete?")); {

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, //header er modhe json dite hobe

      };
      const response = await fetch(`https://online-blood-donation-backend.onrender.com/deleteUser/${id}`, requestOptions);


      alert("deleted successfully")

      window.location.reload();
    }
  }
  return (
    <>
    <Home></Home>
      <h4>
        User list
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
            <th className="head" scope="col">Gender</th>
            <th className="head" scope="col">Dob</th>
            <th className="head" scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {
            allusers.map((data, index) =>
              <tr>
                <th className="first" scope="row">{index + 1}</th>
                <td classNamce="first">{data.name}</td>
                <td className="first">{data.email}</td>
                <td className="first">{data.password}</td>
                <td className="first">{data.address}</td>
                <td className="first">{data.contact}</td>
                <td className="first">{data.gender}</td>
                <td className="first">{data.dob}</td>
                <td className="first">
                  <button onClick={(e) => editUser(data._id)}>Edit</button>
                  <button onClick={(e) => deleteUser(data._id)}>Delete</button>
                </td>
              </tr>
            )
          }

        </tbody>

      </table>

    </>
  )
}

export default ShowUserInfo
