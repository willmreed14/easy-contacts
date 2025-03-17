// Component: Contact intake form

import { useState } from "react"
import './App.css';

const ContactForm = ({ onContactCreated }) => {
    // State for all three variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // What to do when the form is submitted
    const onSubmit = async (e) => {
        // Don't refresh the page when submitting the form
        e.preventDefault()

        // Setup POST request to create the contact

        // Define the data we want to pass w/ the request
        const data = {
            firstName,
            lastName,
            email
        }

        // Specify the URL
        const url = "http://127.0.0.1:5000/create_contact"

        // Setup some options for the request
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Specify that we're about to submit JSON
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options);

        // Verify whether response is successful
        if (response.status !== 201 && response.status !== 200) {
            // not successful
            const data = await response.json()
            alert(data.message)
        } else {
            // successful
            onContactCreated(); // Refresh the contact list
            // Clear the form
            setFirstName("");
            setLastName("");
            setEmail("");
        }
    }

    // Return the form
    return (
        <form onSubmit={onSubmit}>
            <div class="form-row"> {/* Ask user for first name */}
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div class="form-row"> {/* Ask user for last name */}
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div class="form-row"> {/* Ask user for email */}
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {/* On button press, call onSubmit() */}
            <button type="submit">Create Contact</button>
        </form>
    );
};

export default ContactForm