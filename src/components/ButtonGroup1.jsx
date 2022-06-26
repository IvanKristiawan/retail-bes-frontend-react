import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ButtonGroup1 = ({ id, kode, addLink, editLink, deleteUser }) => {
  return (
    <div>
      <Link to={addLink} className="button is-success is-small">
        +Tambah
      </Link>
      <Link
        to={editLink}
        className="button is-info is-small"
        style={{ visibility: kode ? "visible" : "hidden" }}
      >
        <AiOutlineEdit /> Ubah
      </Link>
      <button
        onClick={() => deleteUser(id)}
        className="button is-danger is-small"
        style={{ visibility: kode ? "visible" : "hidden" }}
      >
        <AiOutlineDelete /> Hapus
      </button>
    </div>
  );
};

export default ButtonGroup1;
