import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import style from './App.module.css';

export const App = () => {
  return (
    <div>
      <h1 className={style.header}>Phonebook</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};
