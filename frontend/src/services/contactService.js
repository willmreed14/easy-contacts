import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

class ContactService {
    constructor() {
        this.localStorageKey = 'tempContacts';
    }

    // Get contacts based on auth state
    async getContacts(userId = null) {
        if (userId) {
            return this.getFirestoreContacts(userId);
        }
        return this.getLocalContacts();
    }

    // Local Storage Methods
    getLocalContacts() {
        const contacts = localStorage.getItem(this.localStorageKey);
        return contacts ? JSON.parse(contacts) : [];
    }

    saveLocalContact(contact) {
        const contacts = this.getLocalContacts();
        contacts.push(contact);
        localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
        return contact;
    }

    // Firestore Methods
    async getFirestoreContacts(userId) {
        const querySnapshot = await getDocs(collection(db, `users/${userId}/contacts`));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async migrateLocalContactsToFirestore(userId) {
        const localContacts = this.getLocalContacts();
        const batch = [];

        for (const contact of localContacts) {
            batch.push(
                addDoc(collection(db, `users/${userId}/contacts`), contact)
            );
        }

        await Promise.all(batch);
        localStorage.removeItem(this.localStorageKey);
    }
}

export const contactService = new ContactService(); 