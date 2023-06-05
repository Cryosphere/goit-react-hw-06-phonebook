import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { setFilter, addContact } from 'redux/slice';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const add = ({ name, number }) => {
    const lowerCase = name.toLowerCase();
    let onList = false;

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === lowerCase) {
        alert(`${contact.name} is already in contacts`);
        onList = true;
      }
    });

    if (onList) {
      return;
    }

    dispatch(addContact(newContact));
  };

  const handleChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filterItems = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1 className={style.header}>Phonebook</h1>
      <ContactForm onSubmit={add} />
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList contacts={filterItems()} />
    </div>
  );
};
