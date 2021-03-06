import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const UbahStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const [gambar, setGambar] = useState("");
  const [kode, setKode] = useState("");
  const [namaStok, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [satuanKecil, setSatuanKecil] = useState("");
  const [satuanBesar, setSatuanBesar] = useState("");
  const [konversi, setKonversi] = useState("");
  const [qty, setQty] = useState("");
  const [hargaJualKecil, setHargaJualKecil] = useState("");
  const [hargaJualBesar, setHargaJualBesar] = useState("");
  const [grup, setGrup] = useState([]);
  const [kodeGrup, setKodeGrup] = useState("ACK");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
    getGroupStok();
  }, []);

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(`${tempUrl}/stoks/${id}`);
      setGambar(response.data.gambar);
      setKode(response.data.kode);
      setNama(response.data.namaStok);
      setMerk(response.data.merk);
      setSatuanKecil(response.data.satuanKecil);
      setSatuanBesar(response.data.satuanBesar);
      setKonversi(response.data.konversi);
      setQty(response.data.qty);
      setHargaJualKecil(response.data.hargaJualKecil);
      setHargaJualBesar(response.data.hargaJualBesar);
      setKodeGrup(response.data.kodeGrup);
      setLoading(false);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/stoks/${id}`, {
        kodeGrup,
        kode,
        namaStok,
        merk,
        qty,
        satuanKecil,
        satuanBesar,
        konversi,
        hargaJualKecil,
        hargaJualBesar,
      });
      setLoading(false);
      navigate("/stok");
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupStok = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setGrup(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Page" title="Ubah Stok" />

      <form onSubmit={updateUser}>
        <div
          className="flex flex-row"
          style={{
            flexDirection: screenSize <= 600 ? "column" : "row",
          }}
        >
          <div className="column is-half">
            <div className="field">
              <label className="label">Kode Groups</label>
              <div className="control">
                <div className="select is-link">
                  <select
                    value={kodeGrup}
                    onChange={(e) => setKodeGrup(e.target.value)}
                  >
                    {grup.map((grup, index) => (
                      <option value={grup.kode} key={grup.kode}>
                        {grup.kode} - {grup.namaGroup}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
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
              <label className="label">Nama Stok</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={namaStok}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Stok"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Merk</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={merk}
                  onChange={(e) => setMerk(e.target.value)}
                  placeholder="Merk"
                />
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
          </div>

          <div className="column is-half">
            <div className="field">
              <label className="label">Satuan Kecil</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={satuanKecil}
                  onChange={(e) => setSatuanKecil(e.target.value)}
                  placeholder="Satuan Kecil"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Satuan Besar</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={satuanBesar}
                  onChange={(e) => setSatuanBesar(e.target.value)}
                  placeholder="Satuan Besar"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Konversi</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={konversi}
                  onChange={(e) => setKonversi(e.target.value)}
                  placeholder="Konversi"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Harga Jual Kecil</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={hargaJualKecil}
                  onChange={(e) => setHargaJualKecil(e.target.value)}
                  placeholder="Harga Jual Kecil"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Harga Jual Besar</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={hargaJualBesar}
                  onChange={(e) => setHargaJualBesar(e.target.value)}
                  placeholder="Harga Jual Besar"
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default UbahStok;
