import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from 'firebase/firestore';
import { db } from '../firebase';

class ContactService {
    constructor() {
        this.localStorageKey = 'tempContacts';
    }

    // Create contact
    async createContact(contact, userId = null) {
        if (userId) {
            const contactsRef = collection(db, `users/${userId}/contacts`);
            const docRef = await addDoc(contactsRef, contact);
            return { id: docRef.id, ...contact };
        } else {
            const contacts = this.getLocalContacts();
            const newContact = { ...contact, id: Date.now().toString() };
            contacts.push(newContact);
            localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
            return newContact;
        }
    }

    // Update contact
    async updateContact(contactId, updates, userId = null) {
        if (userId) {
            const contactRef = doc(db, `users/${userId}/contacts/${contactId}`);
            await updateDoc(contactRef, updates);
            return { id: contactId, ...updates };
        } else {
            const contacts = this.getLocalContacts();
            const index = contacts.findIndex(c => c.id === contactId);
            if (index !== -1) {
                contacts[index] = { ...contacts[index], ...updates };
                localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
                return contacts[index];
            }
        }
    }

    // Delete contact
    async deleteContact(contactId, userId = null) {
        console.log('Delete contact called with:', { contactId, userId });
        try {
            if (userId) {
                console.log('Attempting Firestore delete');
                const contactRef = doc(db, `users/${userId}/contacts/${contactId}`);
                await deleteDoc(contactRef);
                console.log('Firestore delete successful');
            } else {
                console.log('Attempting localStorage delete');
                const contacts = this.getLocalContacts();
                const updatedContacts = contacts.filter(c => c.id !== contactId);
                localStorage.setItem(this.localStorageKey, JSON.stringify(updatedContacts));
                console.log('localStorage delete successful');
            }
        } catch (error) {
            console.error('Error in deleteContact:', error);
            throw error;
        }
    }

    // Get all contacts
    async getContacts(userId = null) {
        if (userId) {
            const contactsRef = collection(db, `users/${userId}/contacts`);
            const snapshot = await getDocs(contactsRef);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } else {
            return this.getLocalContacts();
        }
    }

    // Local storage methods
    getLocalContacts() {
        const contacts = localStorage.getItem(this.localStorageKey);
        return contacts ? JSON.parse(contacts) : [];
    }

    // Migration
    async migrateLocalContactsToFirestore(userId) {
        const localContacts = this.getLocalContacts();
        if (localContacts.length === 0) return;

        const contactsRef = collection(db, `users/${userId}/contacts`);

        // Create all contacts in Firestore
        for (const contact of localContacts) {
            const { id, ...contactData } = contact; // Remove local ID
            await addDoc(contactsRef, contactData);
        }

        // Clear local storage after successful migration
        localStorage.removeItem(this.localStorageKey);
    }
}

export const contactService = new ContactService(); 