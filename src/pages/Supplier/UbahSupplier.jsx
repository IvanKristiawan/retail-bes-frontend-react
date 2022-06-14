import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const UbahSupplier = () => {
  const { currentColor, screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers/${id}`);
    setKode(response.data.kode);
    setNama(response.data.namaSupplier);
    setAlamat(response.data.alamatSupplier);
    setKota(response.data.kota);
    setTelp(response.data.telp);
    setNpwp(response.data.npwp);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/suppliers/${id}`, {
        kode,
        namaSupplier,
        alamatSupplier,
        kota,
        telp,
        npwp,
      });
      setLoading(false);
      navigate("/supplier");
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
      <Header category="Page" title="Edit Supplier" />
      <div className="column is-half">
        <form onSubmit={updateUser}>
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
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={namaSupplier}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alamatSupplier}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Kota</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                placeholder="Kota"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Telpon</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                placeholder="Telpon"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NPWP</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                placeholder="NPWP"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button
                color="white"
                bgColor={currentColor}
                text="Save"
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

export default UbahSupplier;
