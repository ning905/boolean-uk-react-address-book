import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";
import { updateArr } from "../functions/arrayFunctions";

function ContactsAdd(props) {
  const { setContacts, contacts, contactId, setContactId } = props;
  const iniContactData = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: "",
    id: contactId,
  };

  const [thisContact, setThisContact] = useState(iniContactData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log("location ", location.state);
    if (location.state) {
      const { contact } = location.state;
      setThisContact(contact);
    }
  }, [location]);

  function handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    const { name, value } = event.target;
    setThisContact({ ...thisContact, [name]: value });
  }

  // console.log(thisContact.id);
  // console.log("contactId", contactId);
  // console.log("thisContact.id < contactId", thisContact.id < contactId);
  function handleSubmit(event) {
    event.preventDefault();

    if (thisContact.id < contactId) {
      fetch(`${apiUrl}/contacts/${thisContact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...thisContact,
        }),
      }).then(() => {
        setContacts(updateArr(contacts, thisContact));
      });
    } else {
      fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...thisContact,
        }),
      })
        // .then((res) => res.json())
        .then(() => {
          setContacts([...contacts, thisContact]);
        })
        .then(() => {
          setContactId(contactId + 1);
        });
    }
    navigate("/");
  }

  // console.log("contacts: ", contacts);
  // console.log("this contact :", thisContact);

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <div className="contact-type">
        <label htmlFor="work">👩🏻‍💻 Work</label>
        <input
          id="work"
          name="type"
          type="radio"
          value="work"
          checked={thisContact.type === "work"}
          onChange={handleChange}
          required
        />

        <label htmlFor="personal">👭🏻 Personal</label>
        <input
          id="personal"
          name="type"
          type="radio"
          value="personal"
          checked={thisContact.type === "personal"}
          onChange={handleChange}
          required
        />
      </div>

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
