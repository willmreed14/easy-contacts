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

  // Render each component
  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm onContactCreated={fetchContacts} />
    </>
  );
}

export default App
