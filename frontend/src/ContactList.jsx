// The component for rendering our contacts

import React from "react"
import './App.css';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Create the new component: A table of contacts
const ContactList = ({ contacts, updateContact, updateCallback }) => {

    // On Delete
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            };

            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)

            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            };

        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-blue-50 transition-colors duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-800 font-medium">
                                            {contact.firstName[0]}{contact.lastName[0]}
                                        </span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {contact.firstName} {contact.lastName}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {contact.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => updateContact(contact)}
                                    className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center gap-1"
                                >
                                    <PencilSquareIcon className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(contact.id)}
                                    className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList