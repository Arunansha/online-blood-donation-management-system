import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// import bloodpic1 from "./bloodpic1.jpg"

function Home() {
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      setFlag(1)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('loggedUser')
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
              flag == 1 ?
                <>
                  <li class="nav-item active">
                    <Link class="nav-link" to="/Home">Home <span class="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/Search">Search</Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link" to="/ShowDonorInfo">ShowDonorInfo</Link>
                  </li>
                  <li class="nav-item ps-2">
                    <Link class="nav-link" to="/ShowUserInfo" >ShowUserInfo</Link>
                  </li>
                <li class="nav-item ps-2">
                    <Link class="nav-link" to="/Payment" >Donate</Link>
                  </li>

                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Userlogin">Userlogin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Donorlogin">Donorlogin</Link>
                  </li>
                </>
            }

          </ul>

        </div>
      </nav>

    </>
  )

}

export default Home
