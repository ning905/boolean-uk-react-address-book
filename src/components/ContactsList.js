import { Link, useSearchParams } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";
import { filterArr } from "../functions/arrayFunctions";

function ContactsList(props) {
  const { contacts, setContacts } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTypes = searchParams.getAll("type");

  let filteredContacts;
  if (selectedTypes.length > 0) {
    filteredContacts = contacts.filter((contact) =>
      selectedTypes.includes(contact.type)
    );
  } else {
    filteredContacts = [...contacts];
  }

  function handleClick(itemToDelete) {
    fetch(`${apiUrl}/contacts/${itemToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        setContacts(filterArr(contacts, itemToDelete));
      });
  }

  function handleChange(event) {
    const { checked, value } = event.target;
    if (checked) {
      setSearchParams({ type: [...selectedTypes, value] });
    } else {
      const updated = selectedTypes.filter((type) => type !== value);
      setSearchParams({ type: [...updated] });
    }
  }

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
            checked={selectedTypes.includes("work")}
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
            checked={selectedTypes.includes("personal")}
            onChange={handleChange}
          />
          <label htmlFor="personal">👭🏻 Personal</label>
        </div>
      </div>

      <ul className="contacts-list">
        {filteredContacts.map((contact, index) => {
          const { type, firstName, lastName } = contact;

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
