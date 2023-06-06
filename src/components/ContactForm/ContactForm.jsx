import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/slice';
import { useSelector, useDispatch } from 'react-redux';

import style from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts);
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
  const nameId = nanoid();
  const numberId = nanoid();

  const handleName = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleNumber = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    add({ name: name, number: number, id: nanoid() });
    form.reset();
    setName('');
    setNumber('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        className={style.input}
        id={nameId}
        onChange={handleName}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <label htmlFor={numberId}>Phone</label>
      <input
        className={style.input}
        id={numberId}
        type="tel"
        name="number"
        value={number}
        onChange={handleNumber}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={style.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
