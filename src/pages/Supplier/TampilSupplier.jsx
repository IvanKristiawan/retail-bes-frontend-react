import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader } from "../../components";

const TampilSupplier = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [kode, setKode] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
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
    const response = await axios.get(`${tempUrl}/suppliers`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/suppliers/${id}`);
      setKode(response.data.kode);
      setNama(response.data.namaSupplier);
      setAlamat(response.data.alamatSupplier);
      setKota(response.data.kota);
      setTelp(response.data.telp);
      setNpwp(response.data.npwp);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/suppliers/${id}`);
      getUsers();
      setKode("");
      setNama("");
      setAlamat("");
      setKota("");
      setTelp("");
      setNpwp("");
      setLoading(false);
      navigate("/supplier");
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
      val.namaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kota.toUpperCase().includes(searchTerm.toUpperCase())
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
      <Header category="Master" title="Supplier" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link
            to={`/supplier/tambahSupplier`}
            className="button is-success is-small"
          >
            +Tambah
          </Link>
          <Link
            to={`/supplier/${id}/edit`}
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
        className="flex flex-row"
        style={{
          flexDirection: screenSize <= 600 ? "column" : "row",
        }}
      >
        <div className="column is-half">
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
                value={namaSupplier ? namaSupplier : ""}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alamatSupplier ? alamatSupplier : ""}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field">
            <label className="label">Kota</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kota ? kota : ""}
                onChange={(e) => setKota(e.target.value)}
                placeholder="Kota"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Telpon</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={telp ? telp : ""}
                onChange={(e) => setTelp(e.target.value)}
                placeholder="Telpon"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NPWP</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={npwp ? npwp : ""}
                onChange={(e) => setNpwp(e.target.value)}
                placeholder="NPWP"
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
            <th>Nama</th>
            <th className="is-hidden-mobile">Alamat</th>
            <th className="is-hidden-mobile">Kota</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.alamatSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kota.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={user._id}>
                <td>
                  <Link
                    to={`/supplier/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {user.kode}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/supplier/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {screenSize >= 600
                      ? user.namaSupplier
                      : `${user.namaSupplier.substr(0, 15)}...`}
                  </Link>
                </td>
                <td className="is-hidden-mobile">{user.alamatSupplier}</td>
                <td className="is-hidden-mobile">{user.kota}</td>
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

export default TampilSupplier;
