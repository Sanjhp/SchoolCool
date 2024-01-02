import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import style from "./query.module.css";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const RaiseQuery = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [childrenSchoolIds, setChildrenSchoolIds] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("");

  useEffect(() => {
    // Fetch schoolId from cookies
    const userDataFromCookie = Cookies.get("user");
    if (userDataFromCookie) {
      const parsedUserData = JSON.parse(userDataFromCookie);
      const schoolIds = parsedUserData.children.map((child) => child.schoolId);

      // Set the default selectedSchoolId as the first child's schoolId
      setSelectedSchoolId(schoolIds[0]);
      setChildrenSchoolIds(schoolIds);
    }
  }, []);

  async function addQuery() {
    try {
      const response = await axios.post("/help/help", {
        title: title,
        content: content,
        schoolId: selectedSchoolId,
      });

      if (response.status === 201) {
        toast.success("Query Added!!");
        setTitle("");
        setContent("");
        // Reset the selected school ID to the first child's school ID
        setSelectedSchoolId(childrenSchoolIds[0]);
      } else {
        console.log(response.status);
        console.log(response);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  const handleAddQuery = () => {
    addQuery();
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.mainStu}>
          <h2>Raise Query</h2>
          <div>
            <div style={{ display: "flex" }}>
              <label>Title:</label>
              <input
                type="text"
                className={style.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <label>S ID:</label>
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
            <div className={style.text_area}>
              <label>Content:</label>
              <textarea
                className={style.text_area_input}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className={style.add} onClick={handleAddQuery}>
            Submit
          </button>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default RaiseQuery;
