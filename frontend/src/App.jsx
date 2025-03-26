import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './App.css';

function App() {
  // Setup State to store and update the displaying of contacts
  /* React useState Hook Review

  const [state, setState] = useState(initialValue)

  So in our case...
    - Initial value is an empty list, since at first there 
      aren't any contacts to display.
    - contacts: holds the current value
    - setContacts: function used to update the current value
    - when setContacts is called, React re-renders the component,
      reflecting the updated state in the UI.

  */
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({})

  // Update the state with all contacts upon page load
  useEffect(() => {
    fetchContacts();
  }, []);

  // Send a GET request to the .../contacts endpoint to get the contacts.
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json(); // Parse the response to JSON
    setContacts(data.contacts); // Update the useState
    console.log(data.contacts);
  };

  // Modal toggling

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({})
  };

  // Open modal via create contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true); // open modal if it is not already open
  };

  // Open modal via update contact
  const openEditModal = (contact) => {
    if (isModalOpen) return;

    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  //
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }


  // Render each component
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Manager</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
          <button
            onClick={openCreateModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Create New Contact
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{Object.keys(currentContact).length ? 'Edit Contact' : 'Create Contact'}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
