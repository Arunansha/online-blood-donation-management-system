import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "./contactus.css"
import Navbar from "./Navbar";


function Contactus() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! We will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="contact-us-container">
                <h1>Contact Us</h1>
                <p>If you have any questions, suggestions, or need assistance, feel free to reach out to us. We’d love to hear from you!</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your message..."
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </form>

                <div className="contact-info">
                    <h3>Our Office</h3>
                    <p>BloodSave Foundation</p>
                    <p>1,Lenin Sarani,VIP
                        Kolkata-700026,West Bengal
                    </p>
                    <p>Email: contact@bloodsave.org</p>
                    <p>Phone:1238566</p>
                </div>
            </div>
        </>
    )
}
export default Contactus

