import React from "react";

export default function Home(props) {
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <>
      <div>Demo page</div>
      <div onClick={handleBack} style={{ cursor: "pointer" }}>
        Back
      </div>
    </>
  );
}
