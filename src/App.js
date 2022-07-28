import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import MeetingsList from "./components/MeetingsList";
import "./styles/styles.css";
import { apiUrl } from "./functions/apiFunctions";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();
  // console.log("contactId", contactId);

  useEffect(() => {
    fetch(`${apiUrl}/contacts`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setContacts(data);
        // console.log(data[data.length - 1].id);
        setContactId(data[data.length - 1].id + 1);
      });
  }, []);

  // console.log("Contacts", contacts);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="/contacts/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd
                contacts={contacts}
                setContacts={setContacts}
                contactId={contactId}
                setContactId={setContactId}
              />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsAdd
                contacts={contacts}
                setContacts={setContacts}
                contactId={contactId}
              />
            }
          />
          <Route path="/contacts/:id/meetings" element={<MeetingsList />} />
        </Routes>
      </main>
    </>
  );
}
