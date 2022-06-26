import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TampilAPenjualanStok = () => {
  const { screenSize } = useStateContext();
  const { id, idAPenjualanStok } = useParams();
  const navigate = useNavigate();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const [penjualanStoks, setPenjualanStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPenjualanStoks();
    getUserById();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStok(response.data);
    setLoading(false);
  };

  const getPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setPenjualanStok(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(
        `${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`
      );
      setKodeStok(response.data.kodeStok);
      setQty(response.data.qty);
      setHargaSatuan(response.data.hargaSatuan);
      setPotongan(response.data.potongan);
      setSubTotal(response.data.subtotal);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const findStok = stoks.find((stok) => stok.kode === kodeStok);
      const newQty = parseInt(findStok.qty) + parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty,
      });
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total: penjualanStoks.total - subtotal,
      });
      await axios.delete(`${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`);
      setKodeStok("");
      setQty("");
      setHargaSatuan("");
      setPotongan("");
      setSubTotal("");
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${id}`);
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
      <Header category="Transaksi" title="Stok Penjualan" />
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

export default TampilAPenjualanStok;
