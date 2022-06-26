import React from "react";

const SearchBar = ({ setSearchTerm, screenSize }) => {
  return (
    <div
      className="field has-addons"
      style={{
        marginTop: screenSize <= 600 ? "20px" : "0",
      }}
    >
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Kata Kunci"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="control">
        <button type="submit" className="button is-info">
          Cari
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
