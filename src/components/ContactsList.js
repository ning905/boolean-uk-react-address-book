import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";
import { deleteFromApi } from "../functions/apiFunctions";
import { filterArr } from "../functions/arrayFunctions";

function ContactsList(props) {
  const { contacts, setContacts } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([]);
  let filteredContacts = [...contacts];
  const selectedTypes = searchParams.getAll("type");
  // const filteredContacts = contacts.filter((contact) =>
  //   filters.includes(contact.type)
  // );
  const showWorkContacts = searchParams.getAll("type").includes("work");
  console.log("showWorkContacts", showWorkContacts);
  const showPersonalContacts = searchParams.getAll("type").includes("personal");

  useEffect(() => {
    setSearchParams({ type: filters });

    if (showWorkContacts || showPersonalContacts) {
      filteredContacts = contacts.filter((contact) =>
        filters.includes(contact.type)
      );
    }
    console.log("filteredContacts", filteredContacts);
  }, [filters]);

  function handleClick(itemToDelete) {
    deleteFromApi(`${apiUrl}/contacts`, itemToDelete);

    setContacts(filterArr(contacts, itemToDelete));
  }

  function handleChange(event) {
    const { checked, name, value } = event.target;
    // console.log("name: ", name);
    // console.log("value: ", value);
    if (checked) {
      setFilters([...filters, value]);
    } else {
      const newFilters = filters.filter((filter) => filter !== value);
      setFilters(newFilters);
    }
  }

  console.log("filters: ", filters);
  console.log("selectedTypes: ", selectedTypes);

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>

      <div>
        <h3>Show contacts by type:</h3>

        <div>
          <input
            type="checkbox"
            id="work"
            name="type"
            value="work"
            // checked={filters.includes("work")}
            onChange={handleChange}
          />
          <label htmlFor="work">👩🏻‍💻 Work</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="personal"
            name="type"
            value="personal"
            // checked={filters.includes("personal")}
            onChange={handleChange}
          />
          <label htmlFor="personal">👭🏻 Personal</label>
        </div>
      </div>

      <ul className="contacts-list">
        {filteredContacts.map((contact, index) => {
          const { type, firstName, lastName } = contact;

          {
            /* console.log("this contact is: ", contact); */
          }

          return (
            <li className="contact" key={index}>
              <p>
                <span>
                  {type === "work" && "👩🏻‍💻"}
                  {type === "personal" && "👭🏻"}
                </span>
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
