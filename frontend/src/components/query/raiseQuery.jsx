import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import style from "./query.module.css";
import "react-toastify/dist/ReactToastify.css";

const RaiseQuery = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function addNotice() {
    try {
      const response = await axios.post("/help/help", {
        title: title,
        content: content,
      });
      if (response.status === 201) {
        toast.success("Notice Added!!");
        setTitle("");
        setContent("");
      } else {
        console.log(response.status);
        console.log(response);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  const handleAddNotice = () => {
    addNotice();
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
              ></input>
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <label>S ID: </label>
              <input
                type="text"
                className={style.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
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
          <button className={style.add} onClick={handleAddNotice}>
            Submit
          </button>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default RaiseQuery;