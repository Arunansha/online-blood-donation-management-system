import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Home from "./Home";
import Userlogin from "./Userlogin";
import Donorlogin from "./Donorlogin";
import Search from "./Search";
import Donorregister from "./Donorregister";
import Userregister from "./Userregister";
import EditDonor from "./EditDonor";
import ShowDonorInfo from "./ShowDonorInfo";
import ShowUserInfo from "./ShowUserInfo";
import EditUser from "./EditUser";

import "./donorlogin.css"
import Forgotpassworduser from "./Forgotpassworduser";
import Forgotpassworddonor from "./Forgotpassworddonor";
import Payment from "./Payment";





function Main() {
    return (
        <>

            <Router>




                <Routes>

                    <Route exact path="/ShowDonorInfo" element={<ShowDonorInfo />}></Route>
                    <Route exact path="/ShowUserInfo" element={<ShowUserInfo />}></Route>
                    <Route exact path="/Userlogin" element={<Userlogin />}></Route>
                    <Route exact path="/Donorlogin" element={<Donorlogin />}></Route>
                    <Route exact path="/Donorregister" element={<Donorregister />}></Route>
                    <Route exact path="/Userregister" element={<Userregister />}></Route>
                    <Route exact path="/Search" element={<Search />}></Route>
                    <Route exact path="/EditDonor" element={<EditDonor />}></Route>
                    <Route exact path="/EditUser" element={<EditUser />}></Route>
                    <Route exact path="/home" element={<Home></Home>}></Route>
                    <Route exact path="/" element={<Userlogin></Userlogin>}></Route>
                    <Route exact path="/forgotpassworduser" element={<Forgotpassworduser></Forgotpassworduser>}></Route>
                    <Route exact path="/forgotpassworddonor" element={<Forgotpassworddonor></Forgotpassworddonor>}></Route>
                    <Route exact path="/Payment" element={<Payment></Payment>}></Route>



                    {/* exact path= jeta lekh ota router er nam ar third bracket e jeta likhchi ota page er nam jeta tanche */}
                </Routes>

            </Router>

        </>
    )
}

export default Main
