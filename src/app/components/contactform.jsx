"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
export default function ContactForm() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Name:', fullname);
        console.log('Email:', email);
        console.log('Message:', message);

        alert("Message sent successfully");



        const res = await fetch('api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, message })
        });

        const { msg } = await res.json();
        setError(msg);
        console.log(error);

    };



    return (
        <>
            <div className="container mt-5">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Name</label>
                        <input onChange={(e) => setFullname(e.target.value)} type="text" id="fullname" className="form-control" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-control" placeholder="z0V8o@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea onChange={(e) => setMessage(e.target.value)} id="message" className="form-control" placeholder="Write your message here" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>


                <div className="mt-3">
                    <div className="alert alert-danger" role="alert">
                        Error message
                    </div>
                </div>
            </div>
        </>
    );
}
