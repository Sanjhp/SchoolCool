import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./query.module.css";
import Cookies from "js-cookie";

const Accordion = ({ title, content, reply }) => {
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
          <p>
            <strong>Query:</strong> {content}
          </p>
          <p>
            <strong>Reply:</strong> {reply}
          </p>
        </div>
      )}
    </div>
  );
};

const RepliedQuery = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");
  const [childrenSchoolIds, setChildrenSchoolIds] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schoolId from cookies
    const userDataFromCookie = Cookies.get("user");
    if (userDataFromCookie) {
      const parsedUserData = JSON.parse(userDataFromCookie);
      const schoolIds = parsedUserData.children.map((child) => child.schoolId);

      // Set the default selectedSchoolId as the first child's schoolId
      setSelectedSchoolId(schoolIds[0]);
      setChildrenSchoolIds(schoolIds);
      setLoading(false); // Set loading to false once data is fetched
    }
  }, []);

  useEffect(() => {
    // Fetch queries when the component mounts or when selectedSchoolId changes
    if (!loading) {
      getQueries();
    }
  }, [selectedSchoolId, loading]);

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
        setQueries(response.data.reverse());
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div className={style.mainStu}>
        <h2>Query Reply</h2>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="schoolId">Select School ID:</label>
          <select
            className={style.input}
            value={selectedSchoolId}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
          >
            {childrenSchoolIds.map((id) => (
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
            content={query.content || "Content not available"}
            reply={query.reply || "Reply not available"}
          />
        ))}
        {queries.length === 0 && error.length === 0 && (
          <p>No queries available.</p>
        )}
      </div>
    </div>
  );
};

export default RepliedQuery;
