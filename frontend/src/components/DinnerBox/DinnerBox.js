import React from "react";

function DinnerBox(input) {
  return (
    <div className="dinnerBox">
      <p>{input.go.items[0].name}</p>
    </div>
  );
}

export default DinnerBox;
