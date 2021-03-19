import React from "react";

export default function Home(props) {
  const handleTurn = (path) => {
    props.history.push(path);
  };
  return (
    <>
      <div>Home</div>
      <div
        onClick={handleTurn.bind(this, "/Demo")}
        style={{ cursor: "pointer" }}
      >
        Demo
      </div>
    </>
  );
}
