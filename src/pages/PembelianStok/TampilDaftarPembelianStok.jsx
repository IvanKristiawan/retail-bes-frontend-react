import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader } from "../../components";

const TampilDaftarPembelianStok = () => {
  const { screenSize } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const kode = null;

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    getSupplier();
    getUsers();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
    setLoading(false);
  };

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/pembelianStoks`);
    setUser(response.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const tempPosts = users.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (
      val.nomorNota.includes(searchTerm) ||
      val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kodeSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
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
      <Header category="Transaksi" title="Daftar Pembelian Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link
            to={`/daftarPembelianStok/pembelianStok/tambahPembelianStok`}
            className="button is-success is-small"
          >
            +Tambah
          </Link>
          <Link
            to={`\#`}
            className="button is-info is-small"
            style={{ visibility: kode ? "visible" : "hidden" }}
          >
            <AiOutlineEdit /> Ubah
          </Link>
          <button
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
      <table className="table is-striped is-fullwidth mt-5">
        <thead>
          <tr>
            <th>No. Nota</th>
            <th>Tanggal</th>
            <th className="is-hidden-mobile">Jenis</th>
            <th className="is-hidden-mobile">Kode Supplier</th>
            <th className="is-hidden-mobile">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.nomorNota.includes(searchTerm) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={user._id}>
                <td>
                  <Link
                    to={`/daftarPembelianStok/pembelianStok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {user.nomorNota}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/daftarPembelianStok/pembelianStok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {user.updatedAt.slice(8, 10)}-{user.updatedAt.slice(5, 7)}-
                    {user.updatedAt.slice(0, 4)}
                  </Link>
                </td>
                <td className="is-hidden-mobile">{user.jenis}</td>
                <td className="is-hidden-mobile">
                  {user.kodeSupplier} -
                  {suppliers
                    .filter((supplier) => supplier.kode == user.kodeSupplier)
                    .map((sup) => ` ${sup.namaSupplier}`)}
                </td>
                <td className="is-hidden-mobile">{user.total}</td>
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

export default TampilDaftarPembelianStok;
