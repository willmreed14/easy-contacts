// Component: Contact intake form

import { useState } from "react"
import './App.css';

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // State for all three variables
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    // Are we updating or creating a contact?
    const updating = Object.entries(existingContact).length !== 0

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

        // Specify the URL by appending dynamic endpoint (create or update)
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        // Setup some options for the request
        const options = {
            method: updating ? "PATCH" : "POST",
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
            // Close the modal
            updateCallback();

        }
    }

    // Return the form
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
                {updating ? "Update Contact" : "Create Contact"}
            </button>
        </form>
    );
};

export default ContactForm