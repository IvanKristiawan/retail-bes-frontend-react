import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const UbahPenjualanStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setNomorNota(response.data.nomorNota);
    setJenis(response.data.jenis);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        nomorNota,
        jenis,
      });
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Transaksi" title="Ubah Penjualan" />
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nomor Nota</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nomorNota}
                onChange={(e) => setNomorNota(e.target.value)}
                placeholder="Nomor Nota"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Jenis</label>
            <div className="control">
              <div className="select is-link">
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                >
                  <option value="TUNAI">TUNAI</option>
                  <option value="KREDIT">KREDIT</option>
                </select>
              </div>
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

export default UbahPenjualanStok;
