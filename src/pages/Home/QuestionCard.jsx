import React, { useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function QuestionCard(props) {
  const { title, askedby, qdesc } = props
   

  return (
    <>
      <div className="single_question d-flex justify-content-between align-content-center ">
        <div className="left d-flex">
          <div className=" p-4">
            <AccountCircleIcon sx={{ fontSize: 40 }} />
            <p>{askedby}</p>
          </div>
          <div className=" p-4">
            <p>{title}</p>
            <p>{qdesc}</p>
          </div>
        </div>
        <div className="pt-5">
          <ArrowForwardIosIcon />
        </div>
      </div>
      <hr />
    </>
  );
}

export default QuestionCard;
