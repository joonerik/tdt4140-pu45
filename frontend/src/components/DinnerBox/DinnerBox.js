import React from "react";

function DinnerBox(props) {
  return (
    <div className="dinnerBox">
      <p>{props.loc}</p>
      <p>{props.course}</p>
    </div>
  );
}

export default DinnerBox;
