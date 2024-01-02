import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./query.module.css";

const Accordion = ({ title, reply }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button
        className={`accordion-button ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
        style={{
          width: "100%",
          padding: "10px",
          textAlign: "left",
          margin: "20px 0px",
        }}
      >
        <span style={{ position: "absolute", right: "45px" }}>
          {isOpen ? "▲" : "▼"}
        </span>
        {title}
      </button>
      {isOpen && (
        <div className="accordion-content">
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

const QueryReply = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("4483833"); // Default value

  const dummySchoolIds = ["4483833", "1234567", "9876543", "5555555"];

  useEffect(() => {
    getQueries();
  }, [selectedSchoolId]);

  async function getQueries() {
    try {
      const response = await axios.get(`/help/closedQuery/${selectedSchoolId}`);

      if (response.status !== 200) {
        console.log(response.status);
        if (response.data.error) {
          setError(response.data.error);
        }
      } else {
        setError("");
        setQueries(response.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg);
    }
  }

  return (
    <div className={style.container}>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div className={style.mainStu}>
        <h2>Query Reply</h2>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="schoolId">Select School ID:</label>
          <select
            id="schoolId"
            className={style.inputSearchGrades}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
            value={selectedSchoolId}
          >
            {dummySchoolIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        {queries.map((query, index) => (
          <Accordion
            key={index}
            title={query.title || "Title not available"}
            reply={query.reply || "Reply not available"}
          />
        ))}
      </div>
    </div>
  );
};

export default QueryReply;
