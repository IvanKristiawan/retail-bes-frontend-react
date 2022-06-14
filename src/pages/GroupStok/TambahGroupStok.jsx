import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TambahGroupStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [namaGroup, setNama] = useState("");
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setUser(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/groupStoks`, {
        kode,
        namaGroup,
      });
      setLoading(false);
      navigate("/groupStok");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Page" title="Tambah Group Stok" />
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Kode</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                placeholder="Kode"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Group</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={namaGroup}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button
                color="white"
                bgColor={currentColor}
                text="Simpan"
                borderRadius="10px"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahGroupStok;
