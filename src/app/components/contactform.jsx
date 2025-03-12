"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!fullname || !email || !message) {
            const errorMessage = 'Please fill in all fields.';
            setError(errorMessage);
            toast.error(errorMessage); // Show toast notification
            return;
        }

        console.log('Submitting form with data:', { fullname, email, message });

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, message })
        });

        console.log('API response status:', res.status);

        if (!res.ok) {
            const errorData = await res.text();
            setError(`Error: ${errorData}`);
            toast.error(`Error: ${errorData}`); // Show toast notification
            return;
        }

        const data = await res.json();
        console.log('API response data:', data);

        if (data.msg) {
            toast.success(data.msg); // Show success toast
        } else {
            const unexpectedError = 'An unexpected error occurred.';
            setError(unexpectedError);
            toast.error(unexpectedError); // Show toast notification
            console.log('Unexpected response structure:', data);
        }
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
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-control" placeholder="example@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea onChange={(e) => setMessage(e.target.value)} id="message" className="form-control" placeholder="Write your message here" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
                <ToastContainer /> {/* Toast Container for notifications */}
            </div>
        </>
    );
}
