import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TambahAPembelianStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const { id } = useParams();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stoks, setStok] = useState([]);
  const [pembelianStoks, setPembelianStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPembelianStoks();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStok(response.data);
    setLoading(false);
  };

  const getPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
    setPembelianStok(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/aPembelianStoks`, {
        nomorNota: pembelianStoks.nomorNota,
        kodeStok,
        qty,
        hargaSatuan,
        potongan,
        subtotal: hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100,
      });
      await axios.patch(`${tempUrl}/pembelianStoks/${id}`, {
        total:
          pembelianStoks.total +
          hargaSatuan * qty -
          (hargaSatuan * qty * potongan) / 100,
      });
      const findStok = stoks.find((stok) => stok.kode === kodeStok);
      const newQty = parseInt(findStok.qty) + parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty,
      });
      setLoading(false);
      navigate(`/daftarPembelianStok/pembelianStok/${id}`);
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
      <Header category="Transaksi" title="Tambah Stok Pembelian" />
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
            placeholder="Cari Kode Stok"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-info">
            Cari
          </button>
        </div>
      </div>
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Kode Stok</label>
            <div className="control">
              <div className="select is-link is-normal">
                <select
                  value={kodeStok}
                  onChange={(e) => setKodeStok(e.target.value)}
                >
                  <option value="" select="true">
                    Pilih Kode Stok
                  </option>
                  {stoks
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.kode
                          .toUpperCase()
                          .includes(searchTerm.toUpperCase()) ||
                        val.namaStok
                          .toUpperCase()
                          .includes(searchTerm.toUpperCase())
                      ) {
                        return val;
                      }
                    })
                    .map((stok) => (
                      <option value={stok.kode} key={stok.kode}>
                        {stok.kode} - {stok.namaStok}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Harga Satuan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargaSatuan}
                onChange={(e) => setHargaSatuan(e.target.value)}
                placeholder="Harga Satuan"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Potongan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={potongan}
                onChange={(e) => setPotongan(e.target.value)}
                placeholder="Potongan"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Subtotal</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100}
                onChange={(e) => setSubTotal(e.target.value)}
                placeholder="Subtotal"
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

export default TambahAPembelianStok;
