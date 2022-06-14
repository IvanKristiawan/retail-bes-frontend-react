import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader } from "../../components";

const TampilStok = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
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
  const [kodeGrup, setKodeGrup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    getUsers();
    getUserById();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
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
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/stoks/${id}`);
      getUsers();
      setGambar("");
      setKode("");
      setNama("");
      setMerk("");
      setSatuanKecil("");
      setSatuanBesar("");
      setKonversi("");
      setQty("");
      setHargaJualKecil("");
      setHargaJualBesar("");
      setKodeGrup("");
      setLoading(false);
      navigate("/stok");
    } catch (error) {
      console.log(error);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const tempPosts = users.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (
      val.namaStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.satuanKecil.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.satuanBesar.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Master" title="Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link to={`/stok/tambahStok`} className="button is-success is-small">
            +Tambah
          </Link>
          <Link
            to={`/stok/${id}/edit`}
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
              placeholder="Kata Kunci"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Cari
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center"
        style={{
          visibility: gambar ? "visible" : "hidden",
          marginTop: screenSize <= 600 ? "20px" : "0",
        }}
      >
        <Image
          style={{ width: "200px", borderRadius: "20px" }}
          cloudName="dbtag5lau"
          publicId={gambar ? gambar : ""}
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
            <label className="label">Kode Group</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kodeGrup ? kodeGrup : ""}
                onChange={(e) => setKodeGrup(e.target.value)}
                placeholder="Kode Group"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Kode</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kode ? kode : ""}
                onChange={(e) => setKode(e.target.value)}
                placeholder="Kode"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={namaStok ? namaStok : ""}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Merk</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={merk ? merk : ""}
                onChange={(e) => setMerk(e.target.value)}
                placeholder="Merk"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={qty ? qty : ""}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Quantity"
                disabled
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
                value={satuanKecil ? satuanKecil : ""}
                onChange={(e) => setSatuanKecil(e.target.value)}
                placeholder="Satuan Kecil"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Satuan Besar</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={satuanBesar ? satuanBesar : ""}
                onChange={(e) => setSatuanBesar(e.target.value)}
                placeholder="Satuan besar"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Konversi</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={konversi ? konversi : ""}
                onChange={(e) => setKonversi(e.target.value)}
                placeholder="Konversi"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Harga Jual Kecil</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargaJualKecil ? hargaJualKecil : ""}
                onChange={(e) => setHargaJualKecil(e.target.value)}
                placeholder="Harga Jual Kecil"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Harga Jual Besar</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargaJualBesar ? hargaJualBesar : ""}
                onChange={(e) => setHargaJualBesar(e.target.value)}
                placeholder="Harga Jual Besar"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <table className="table is-striped is-fullwidth mt-5">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Stok</th>
            <th className="is-hidden-mobile">Sat-K</th>
            <th className="is-hidden-mobile">Sat-B</th>
            <th className="is-hidden-mobile">Konv.</th>
            <th className="is-hidden-mobile">Harga Jual - K</th>
            <th className="is-hidden-mobile">Harga Jual - B</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.namaStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.satuanKecil
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.satuanBesar.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={user._id}>
                <td>
                  <Link
                    to={`/stok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {user.kode}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/stok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {screenSize >= 600
                      ? user.namaStok
                      : `${user.namaStok.substr(0, 15)}...`}
                  </Link>
                </td>
                <td className="is-hidden-mobile">{user.satuanKecil}</td>
                <td className="is-hidden-mobile">{user.satuanBesar}</td>
                <td className="is-hidden-mobile">{user.konversi}</td>
                <td className="is-hidden-mobile">{user.hargaJualKecil}</td>
                <td className="is-hidden-mobile">{user.hargaJualBesar}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={tempPosts.length}
          screenSize={screenSize}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default TampilStok;
