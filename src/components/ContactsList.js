import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";
import { deleteFromApi } from "../functions/apiFunctions";
import { filterArr } from "../functions/arrayFunctions";

function ContactsList(props) {
  const { contacts, setContacts } = props;

  function handleClick(itemToDelete) {
    deleteFromApi(`${apiUrl}/contacts`, itemToDelete);

    setContacts(filterArr(contacts, itemToDelete));
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;

          {
            /* console.log("this contact is: ", contact); */
          }

          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/edit/${contact.id}`} state={{ contact }}>
                  Edit
                </Link>
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`}>View</Link>
              </p>
              <button onClick={() => handleClick(contact)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
