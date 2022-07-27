import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../App";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;

  function handleClick(itemToDelete) {
    fetch(`${apiUrl}/${itemToDelete.id}`, {
      method: "DELETE",
    });

    const updated = contacts.filter(
      (contact) => contact.id !== itemToDelete.id
    );
    // console.log("Updated: ", updated);
    setContacts(updated);
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
