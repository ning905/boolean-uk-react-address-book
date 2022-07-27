import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../App";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const iniContactData = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: "",
    id: contacts.length + 1,
  };

  const [thisContact, setThisContact] = useState(iniContactData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("location ", location.state);
    if (location.state) {
      const { contact } = location.state;
      setThisContact(contact);
    }
  }, [location]);

  //TODO: Implement controlled form
  //send POST to json server on form submit

  function handleChange(event) {
    const { name, value } = event.target;
    setThisContact({ ...thisContact, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (thisContact.id < contacts.length + 1) {
      fetch(`${apiUrl}/${thisContact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...thisContact,
        }),
      });
      // .then((res) => res.json())
      // .then((data) => {
      //   console.log("PATCH", data);
      // });
    } else {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...thisContact,
        }),
      });
      setContacts([...contacts, thisContact]);
      // console.log("Posted");
    }
    navigate("/");
  }

  // console.log("contacts: ", contacts);
  // console.log("this contact :", thisContact);

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={thisContact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={thisContact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={thisContact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={thisContact.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={thisContact.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        value={thisContact.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="city">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
        value={thisContact.twitter}
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
