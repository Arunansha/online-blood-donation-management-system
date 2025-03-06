import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./aboutus.css"

function Aboutus() {

    return (
        <>
            <Navbar></Navbar>

            <div className="about-us-container">
                <h1>About Us</h1>
                <div className="about-us-section">
                    <h2 className="heading">Our Mission</h2>
                    <p>
                        At BloodSave, our mission is to ensure that everyone has access to life-saving blood when they need it.
                        We aim to create awareness and encourage blood donation to support those in need. Our platform connects
                        blood donors with hospitals and individuals, ensuring that there is always a supply of blood available
                        for emergencies.
                    </p>
                </div>

                <div className="about-us-section">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where no one has to suffer due to a lack of blood. Through collaboration with local
                        healthcare systems, awareness programs, and continuous support for our donors, we strive to build a
                        sustainable blood donation network that saves lives.
                    </p>
                </div>

                <div className="about-us-section">
                    <h2>Why Donate Blood?</h2>
                    <ul>
                        <li>Blood donation can save up to 3 lives with just one donation.</li>
                        <li>Your donation helps accident victims, cancer patients, and those undergoing surgery.</li>
                        <li>Donating blood is simple, safe, and takes less than 30 minutes.</li>
                        <li>By donating, you can help maintain the required blood stock for emergencies and medical treatments.</li>
                    </ul>
                </div>

                
            </div>
        </>
    )

}
export default Aboutus