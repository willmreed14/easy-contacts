import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './App.css';
import { PlusCircleIcon, ArrowPathIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, CheckIcon } from '@heroicons/react/24/outline';
import { auth } from './firebase';
import { contactService } from './services/contactService';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        // User just signed in, migrate contacts if needed
        const localContacts = contactService.getLocalContacts();
        if (localContacts.length > 0) {
          await contactService.migrateLocalContactsToFirestore(user.uid);
        }
        // Get contacts from Firestore
        const firestoreContacts = await contactService.getContacts(user.uid);
        setContacts(firestoreContacts);
      } else {
        // Not signed in, get contacts from localStorage
        const localContacts = contactService.getLocalContacts();
        setContacts(localContacts);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const email = contact.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

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

  const exportToCSV = () => {
    // Get current date for filename
    const date = new Date().toISOString().split('T')[0];
    const filename = `contacts_${date}.csv`;

    // Use filtered contacts instead of all contacts
    const contactsToExport = filteredContacts;

    // Create CSV content
    const headers = ['First Name', 'Last Name', 'Email', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...contactsToExport.map(contact =>
        `${contact.firstName},${contact.lastName},${contact.email},${contact.phone || ''}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Render each component
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Manager</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1 mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center gap-2 hover:scale-105"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Export CSV
              </button>
              <button
                onClick={openCreateModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center gap-2 hover:scale-105"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Create New Contact
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <MagnifyingGlassIcon className="h-8 w-8 mb-2" />
              <p>No contacts found matching "{searchQuery}"</p>
            </div>
          ) : (
            <ContactList contacts={filteredContacts} updateContact={openEditModal} updateCallback={onUpdate} />
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {Object.keys(currentContact).length ? 'Edit Contact' : 'Create Contact'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
            <CheckIcon className="h-5 w-5" />
            <span>Contacts exported successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
