import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./query.module.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordion = ({ title, content, reply, onReplyChange, onSubmitReply }) => {
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
          <textarea
            rows="4"
            cols="120"
            placeholder="Type your reply here..."
            value={reply}
            className={style.text_area}
            onChange={(e) => onReplyChange(e.target.value)}
          />
          <button onClick={onSubmitReply} className={style.add}>
            Submit Reply
          </button>
        </div>
      )}
    </div>
  );
};

const QueryReply = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      // Parse the user data JSON
      const user = JSON.parse(userData);

      // Extract the classTeacher from the user data
      const userClassTeacher = user.parent?.classTeacher || "";

      // Set the classTeacher in the state
      setClassTeacher(userClassTeacher);
      setLoading(false); // Set loading to false once data is fetched
    }
  }, []);

  useEffect(() => {
    // Fetch queries when the component mounts or when classTeacher changes
    if (!loading) {
      getQueries();
    }
  }, [classTeacher, loading]);

  const getQueries = async () => {
    try {
      const response = await axios.get(`/help/open/${classTeacher}?`);

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
  };

  const handleReplyChange = (index, value) => {
    const updatedQueries = [...queries];
    updatedQueries[index].reply = value;
    setQueries(updatedQueries);
  };

  const handleSubmitReply = async (index) => {
    try {
      const queryId = queries[index]._id;
      const reply = queries[index].reply;

      // Validate if reply is not empty
      if (!reply.trim()) {
        toast.error("Reply cannot be empty.");
        return;
      }

      // Make the PATCH request to update the reply
      const response = await axios.patch(`/help/help/${queryId}`, {
        reply: reply,
      });

      if (response.status === 200) {
        toast.success("Reply submitted successfully!");
        // Perform any additional logic if needed

        // Optionally, you can fetch updated queries after submitting the reply
        getQueries();
      } else {
        toast.error("Error submitting reply.");
        console.log("Error submitting reply:", response.status);
        // Handle the error as needed
      }
    } catch (err) {
      toast.error("Error submitting reply.");
      console.log(err);
      // Handle errors
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div className={style.mainStu}>
        <h2>Query Reply</h2>
        {queries.map((query, index) => (
          <Accordion
            key={index}
            title={query.title || "Title not available"}
            content={query.content || "Content not available"}
            reply={query.reply || ""}
            onReplyChange={(value) => handleReplyChange(index, value)}
            onSubmitReply={() => handleSubmitReply(index)}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default QueryReply;
