import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate } from "react-router-dom";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Loader } from "../../components";

const TambahStok = () => {
  const { currentColor, screenSize } = useStateContext();
  const [imageSelected, setImageSelected] = useState("");
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
  const [kodeGrup, setKodeGrup] = useState("");
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
    getGroupStok();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getGroupStok = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setGrup(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    let tempGambar = "";
    let tempGambarId = "";
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "pnwyctyw");

    try {
      setLoading(true);
      {
        imageSelected &&
          (await axios
            .post(
              "https://api.cloudinary.com/v1_1/dbtag5lau/image/upload",
              formData
            )
            .then((response) => {
              tempGambar = response.data.url;
              tempGambarId = response.data.public_id;
            })
            .catch((e) => {
              tempGambar = "";
              console.log(e);
            }));
      }

      await axios.post(`${tempUrl}/stoks`, {
        gambarId: tempGambarId,
        gambar: tempGambar,
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Page" title="Tambah Supplier" />

      <form onSubmit={saveUser}>
        <div className="field">
          <label className="label">Upload Gambar</label>
          <input
            type="file"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
        </div>
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
                    <option value="" select="true">
                      Pilih Kode Stok
                    </option>
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

export default TambahStok;
