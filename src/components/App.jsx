import React, { useState, useEffect, useCallback } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { PhoneBooks } from './Formstyle/Formstyle';

export const App = () => {
  // Define the state using useState hook
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Dimon Oleksenko', number: '666-66-66' },
    { id: 'id-6', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-7', name: 'Hermione Kline', number: '443-89-12' },
  ]);

  // Define the filter state
  const [filter, setFilter] = useState('');

  // Load contacts from local storage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to local storage whenever the contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Add a new contact using a callback function
  const addContact = useCallback(
    (newContact) => {
      const lowerCaseName = newContact.name.toLowerCase();
      const isDuplicate = contacts.some(
        (contact) => contact.name.toLowerCase() === lowerCaseName
      );

      if (isDuplicate) {
        alert('This contact already exists!');
      } else {
        setContacts((prevContacts) => [...prevContacts, newContact]);
      }
    },
    [contacts]
  );

  // Remove a contact using a callback function
  const removeContact = useCallback(
    (contactID) => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactID)
      );
    },
    []
  );

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter the contacts based on the filter input
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <PhoneBooks>
      <h1>Phonebook</h1>
      <ContactForm onContact={addContact} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} onFilterChange={handleFilterChange} />
      <ContactList filteredContacts={filteredContacts} onRemove={removeContact} />
    </PhoneBooks>
  );
};

export default App;
