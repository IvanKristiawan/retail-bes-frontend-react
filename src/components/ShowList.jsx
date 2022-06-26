import React from "react";

const ShowList = ({ name, value, setValue }) => {
  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={value ? value : ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Kode"
          disabled
        />
      </div>
    </div>
  );
};

export default ShowList;
