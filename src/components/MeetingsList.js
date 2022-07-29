import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../functions/apiFunctions";

export default function MeetingsList() {
  const { id } = useParams();
  const iniMeeting = {
    userId: id,
    date: "",
    time: "",
    location: "",
  };
  const [thisMeeting, setThisMeeting] = useState(iniMeeting);
  const [meetings, setMeetings] = useState([]);

  //   console.log("userId: " + id);
  useEffect(() => {
    fetch(`${apiUrl}/meetings?userId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setMeetings(data);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setThisMeeting({ ...thisMeeting, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${apiUrl}/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...thisMeeting,
      }),
    }).then(() => {
      setMeetings([...meetings, thisMeeting]);
      setThisMeeting(iniMeeting);
    });
  }

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Create Meeting</h2>

        <label htmlFor="date">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          value={thisMeeting.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="time">Time:</label>
        <input
          id="time"
          name="time"
          type="time"
          value={thisMeeting.time}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          value={thisMeeting.location}
          onChange={handleChange}
          required
        />

        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>

      <ul className="meetings-list">
        {meetings.map((meeting, index) => {
          const { date, time, location } = meeting;

          return (
            <li className="contact" key={index}>
              <p>
                {date} {time} {location}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
