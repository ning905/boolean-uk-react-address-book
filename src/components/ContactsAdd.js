import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../App";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const iniContactData = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: "",
  };

  const { setContacts, contacts } = props;
  const [contact, setContact] = useState(iniContactData);
  const navigate = useNavigate();

  //TODO: Implement controlled form
  //send POST to json server on form submit

  function handleChange(event) {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contact,
      }),
    });

    setContacts([...contacts, contact]);
    setContact(iniContactData);

    navigate("/");
  }

  // console.log("contacts: ", contacts);
  // console.log("this contact :", contact);

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={contact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={contact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={contact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={contact.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={contact.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        value={contact.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="city">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
        value={contact.twitter}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
