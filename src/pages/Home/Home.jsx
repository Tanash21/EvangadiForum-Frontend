import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import QuestionCard from "./QuestionCard";
import axios from "../../utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
function Home() {
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(AppState);
  const [qdata, setqdata] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/question/all-questions", {
          headers: {
            Authorization: "Bearer " + token, // Include the token here
          },
        });
        console.log("Data fetched:", data);
        setqdata(data); // Set the fetched data correctly
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  }, [token]);

  console.log(qdata);

  return (
    <>
      <section className="container">
        <div className="d-flex justify-content-between m-5">
          <div>
            <button className="btn btn-primary">Ask question</button>
          </div>
          <div>Welcome: {user.username}</div>
        </div>
        <h3>Questions</h3>
        <hr />
        {qdata.map((question) => (
          <QuestionCard
            key={question?.id}
            title={question?.title}
            askedby={question.username}
            qdesc={question.description}
          />
        ))}
      </section>
    </>
  );
}

export default Home;
