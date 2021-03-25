import React from "react";

export default function Tree(props) {
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <>
      <div>Demo page33333</div>
      <div onClick={handleBack} style={{ cursor: "pointer" }}>
        Back
      </div>
    </>
  );
}
