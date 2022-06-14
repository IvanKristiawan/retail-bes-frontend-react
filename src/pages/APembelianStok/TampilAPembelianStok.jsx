import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TampilAPembelianStok = () => {
  const { screenSize } = useStateContext();
  const { id, idAPembelianStok } = useParams();
  const navigate = useNavigate();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const [pembelianStoks, setPembelianStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPembelianStoks();
    getUserById();
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

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(
        `${tempUrl}/aPembelianStoks/${idAPembelianStok}`
      );
      setKodeStok(response.data.kodeStok);
      setQty(response.data.qty);
      setHargaSatuan(response.data.hargaSatuan);
      setPotongan(response.data.potongan);
      setSubTotal(response.data.subtotal);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const findStok = stoks.find((stok) => stok.kode == kodeStok);
      const newQty = parseInt(findStok.qty) - parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty,
      });
      await axios.patch(`${tempUrl}/pembelianStoks/${id}`, {
        total: pembelianStoks.total - subtotal,
      });
      await axios.delete(`${tempUrl}/aPembelianStoks/${idAPembelianStok}`);
      setKodeStok("");
      setQty("");
      setHargaSatuan("");
      setPotongan("");
      setSubTotal("");
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
      <Header category="Transaksi" title="Stok Pembelian" />
      <div>
        <button
          onClick={() => deleteUser(id)}
          className="button is-danger is-small"
          style={{ visibility: kodeStok ? "visible" : "hidden" }}
        >
          <AiOutlineDelete /> Hapus
        </button>
      </div>
      <div className="column is-half">
        <div className="field">
          <label className="label">Kode Stok</label>
          <div className="control">
            <div className="control">
              <input
                type="text"
                className="input"
                value={kodeStok}
                placeholder="Quantity"
                disabled
              />
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
              placeholder="Quantity"
              disabled
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
              placeholder="Harga Satuan"
              disabled
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
              placeholder="Potongan"
              disabled
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Subtotal</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={subtotal}
              placeholder="Subtotal"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TampilAPembelianStok;
