import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./notice.module.css";

const Accordion = ({ title, content }) => {
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
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getNoticeAll();
  }, []);

  async function getNoticeAll() {
    try {
      const response = await axios.get("/notice/notices");
      if (response.status !== 200) {
        console.log(response.status);
        if (response.data.error) {
          setError(response.data.error);
        }
      } else {
        setError("");
        setNotice(response.data.notices);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  return (
    <div className={style.container}>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div className={style.mainStu}>
        <h2>Notices</h2>
        {notice.map((notice, index) => (
          <Accordion
            key={index}
            title={notice?.title}
            content={notice?.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Notice;
