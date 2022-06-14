import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TambahPembelianStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("TUNAI");
  const [kodeSupplier, setKodeSupplier] = useState("1");
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSupplier();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/pembelianStoks`, {
        nomorNota,
        jenis,
        kodeSupplier,
      });
      setLoading(false);
      navigate("/daftarPembelianStok");
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
      <Header category="Transaksi" title="Tambah Pembelian" />
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Nomor Nota</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nomorNota}
                onChange={(e) => setNomorNota(e.target.value)}
                placeholder="Nomor Nota"
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
            <label className="label">Kode Supplier</label>
            <div className="control">
              <div className="select is-link">
                <select
                  value={kodeSupplier}
                  onChange={(e) => setKodeSupplier(e.target.value)}
                >
                  {suppliers.map((supplier, index) => (
                    <option value={supplier.kode} key={supplier.kode}>
                      {supplier.kode} - {supplier.namaSupplier}
                    </option>
                  ))}
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

export default TambahPembelianStok;
