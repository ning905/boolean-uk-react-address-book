import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const { id } = useParams();
  // console.log("id: ", id);

  useEffect(() => {
    fetch(`${apiUrl}/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
      });
  }, [id]);

  // console.log("contact: ", contact);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <p>{contact.linkedIn}</p>
      <p>{contact.twitter}</p>
      <Link to={`/contacts/${id}/meetings`}>Meetings</Link>
    </div>
  );
}

export default ContactsView;
