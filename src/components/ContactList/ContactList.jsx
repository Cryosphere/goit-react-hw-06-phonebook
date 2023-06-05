import PropTypes from 'prop-types';
import style from './ContactList.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/slice';

export const ContactList = ({ contacts, toDelete }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={style.contactsList}>
        {contacts.map(({ id, name, number }) => (
          <li className={style.contactsListItem} key={id}>
            {name}: {number}
            <button
              className={style.btn}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
