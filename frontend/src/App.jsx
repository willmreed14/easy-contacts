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
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact = {currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
      }
    </>
  );
}

export default App
