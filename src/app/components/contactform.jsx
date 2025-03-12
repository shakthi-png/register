"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function ContactForm() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!fullname || !email || !message) {
            setError('Please fill in all fields.');
            console.log('Form submission error: All fields are required.'); // Log error
            return;
        }

        console.log('Submitting form with data:', { fullname, email, message }); // Log form data

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, message })
        });

        console.log('API response status:', res.status); // Log response status

        if (!res.ok) {
            // If the response is not okay, handle the error
            const errorData = await res.text(); // Get the error response as text
            setError(`Error: ${errorData}`);
            console.log('Error response from API:', errorData); // Log error response
            return;
        }

        const data = await res.json();
        console.log('API response data:', data); // Log response data

        if (data.msg) {
            alert(data.msg);
        } else {
            setError('An unexpected error occurred.');
            console.log('Unexpected response structure:', data); // Log unexpected structure
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

                {error && (
                    <div className="mt-3">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
