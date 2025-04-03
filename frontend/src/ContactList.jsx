// The component for rendering our contacts

import React, { useState } from "react"
import './App.css';
import { PencilSquareIcon, TrashIcon, ClipboardDocumentIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { contactService } from './services/contactService';

// Create the new component: A table of contacts
const ContactList = ({ contacts, updateContact, updateCallback, user }) => {

    // State to track which email was just copied (for showing feedback)
    const [copiedEmail, setCopiedEmail] = useState(null);
    const [copiedPhone, setCopiedPhone] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });

    // On Delete
    const handleDelete = async (contactId) => {
        try {
            await contactService.deleteContact(contactId, user?.uid);
            updateCallback();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const copyEmail = async (email) => {
        await navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000); // Reset after 2 seconds
    };

    const copyPhone = async (phone) => {
        await navigator.clipboard.writeText(phone);
        setCopiedPhone(phone);
        setTimeout(() => setCopiedPhone(null), 2000);
    };

    const sortContacts = (contactsToSort) => {
        if (!sortConfig.key) return contactsToSort;

        return [...contactsToSort].sort((a, b) => {
            if (sortConfig.key === 'name') {
                const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                return sortConfig.direction === 'asc'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            }
            if (sortConfig.key === 'email') {
                return sortConfig.direction === 'asc'
                    ? a.email.toLowerCase().localeCompare(b.email.toLowerCase())
                    : b.email.toLowerCase().localeCompare(a.email.toLowerCase());
            }
            return 0;
        });
    };

    const requestSort = (key) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    const confirmDelete = (contact) => {
        setDeleteConfirmation(contact);
    };

    const handleConfirmedDelete = async () => {
        if (deleteConfirmation) {
            await handleDelete(deleteConfirmation.id);
            setDeleteConfirmation(null);
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 group"
                                onClick={() => requestSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    Name
                                    <ChevronUpDownIcon className={`h-4 w-4 ${sortConfig.key === 'name' ? 'text-blue-500' : 'text-gray-400'}`} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 group"
                                onClick={() => requestSort('email')}
                            >
                                <div className="flex items-center gap-2">
                                    Email
                                    <ChevronUpDownIcon className={`h-4 w-4 ${sortConfig.key === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="mr-8">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortContacts(contacts).map((contact) => (
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
                                    <div className="flex items-center">
                                        <span className="mr-2">{contact.email}</span>
                                        <button
                                            onClick={() => copyEmail(contact.email)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                                            title="Copy email"
                                        >
                                            {copiedEmail === contact.email ? (
                                                <CheckIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <ClipboardDocumentIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {contact.phone ? (
                                        <div className="flex items-center">
                                            <span className="mr-2">{contact.phone}</span>
                                            <button
                                                onClick={() => copyPhone(contact.phone)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                                                title="Copy phone"
                                            >
                                                {copiedPhone === contact.phone ? (
                                                    <CheckIcon className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <ClipboardDocumentIcon className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    ) : (
                                        '-'
                                    )}
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
                                        onClick={() => confirmDelete(contact)}
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

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the contact{' '}
                            <span className="font-semibold">
                                {deleteConfirmation.firstName} {deleteConfirmation.lastName}
                            </span>
                            ? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirmation(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmedDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                                <TrashIcon className="h-4 w-4" />
                                Delete Contact
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactList