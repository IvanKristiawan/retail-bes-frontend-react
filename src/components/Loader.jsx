import React from "react";
import "bulma/css/bulma.css";

const Loader = () => {
  return (
    <div className="pr-10 pl-10" style={{ marginTop: "40vh" }}>
      <progress className="progress is-small is-primary" max="100"></progress>
      <div className="flex justify-center">
        <label className="label">Memuat...</label>
      </div>
    </div>
  );
};

export default Loader;
