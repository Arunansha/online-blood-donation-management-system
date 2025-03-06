import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [flag, setFlag] = useState(0)
  const [flagone, setFlagone] = useState(0)


  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      setFlag(1)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loggedDonor')) {
      setFlagone(1)
    }
  }, [])


  const logoutuser = () => {
    localStorage.removeItem('loggedUser')
    //navigate to again login page
    window.location.href = "/"
  }

  const logoutdonor = () => {
    localStorage.removeItem('loggedDonor')
    //navigate to again login page
    window.location.href = "/"
  }

  return (
    <>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            {
              flag == 0 && flagone == 0 ? (

                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Userlogin">Userlogin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Donorlogin">Donorlogin</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/Search">Search</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/Payment" >Contribute</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/Aboutus" >About us</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/Contactus" >Contact us</Link>
                  </li>
                </>
              ) : flag == 1 ? (

                <>
                  <li class="nav-item active">
                    <Link class="nav-link" to="/Home">Home <span class="sr-only">(current)</span></Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" onClick={logoutuser}>Logoutuser</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/Search">Search</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/ShowUserInfo" >ShowUserInfo</Link>
                  </li>
                </>

              ) : flagone == 1 ? (
                <>
                  {/* <li class="nav-item">
                    <Link class="nav-link" to="/Search">Search</Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logoutdonor}>LogoutDonor</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/AcceptReject">AcceptReject</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/ShowDonorInfo" >ShowDonorInfo</Link>
                  </li>

                </>
              )
                :
                null
            }
          </ul>

        </div>
      </nav >

    </>
  )

}

export default Navbar


// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

// function Navbar() {
//   const [flag, setFlag] = useState(0)
//   const [flagone, setFlagone] = useState(0)

//   useEffect(() => {
//     if (localStorage.getItem('loggedUser')) {
//       setFlag(1)
//     }
//   }, [])

//   useEffect(() => {
//     if (localStorage.getItem('loggedDonor')) {
//       setFlagone(1)
//     }
//   }, [])

//   const logoutuser = () => {
//     localStorage.removeItem('loggedUser')
//     // Navigate to the login page
//     window.location.href = "/"
//   }

//   const logoutdonor = () => {
//     localStorage.removeItem('loggedDonor')
//     // Navigate to the login page
//     window.location.href = "/"
//   }

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             {flag === 0 && flagone === 0 ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/Userlogin">
//                     Userlogin
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/Donorlogin">
//                     Donorlogin
//                   </Link>
//                 </li>
//                 <li className="nav-item ps-2">
//                   <Link className="nav-link" to="/Payment">
//                     Contribute
//                   </Link>
//                 </li>
//                 <li className="nav-item ps-2">
//                   <Link className="nav-link" to="/Aboutus">
//                     About us
//                   </Link>
//                 </li>
//                 <li className="nav-item ps-2">
//                   <Link className="nav-link" to="/Contactus">
//                     Contact us
//                   </Link>
//                 </li>
//               </>
//             ) : flag === 1 ? (
//               <>
//                 <li className="nav-item active">
//                   <Link className="nav-link" to="/Home">
//                     Home <span className="sr-only">(current)</span>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" onClick={logoutuser}>
//                     Logout user
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/Search">
//                     Search
//                   </Link>
//                 </li>
//                 <li className="nav-item ps-2">
//                   <Link className="nav-link" to="/ShowUserInfo">
//                     Show User Info
//                   </Link>
//                 </li>
//               </>
//             ) : flagone === 1 ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" onClick={logoutdonor}>
//                     Logout Donor
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/AcceptReject">
//                     Accept/Reject
//                   </Link>
//                 </li>
//                 <li className="nav-item ps-2">
//                   <Link className="nav-link" to="/ShowDonorInfo">
//                     Show Donor Info
//                   </Link>
//                 </li>
//               </>
//             ) : null}
//           </ul>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar
