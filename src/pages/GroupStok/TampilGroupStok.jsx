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

const TampilGroupStok = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [kode, setKode] = useState("");
  const [namaGroup, setNama] = useState("");
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
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/groupStoks/${id}`);
      setKode(response.data.kode);
      setNama(response.data.namaGroup);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/groupStoks/${id}`);
      getUsers();
      setKode("");
      setNama("");
      setLoading(false);
      navigate("/groupStok");
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
      val.namaGroup.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase())
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
      <Header category="Master" title="Group Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link
            to={`/groupStok/tambahGroupStok`}
            className="button is-success is-small"
          >
            +Tambah
          </Link>
          <Link
            to={`/groupStok/${id}/edit`}
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
      <div className="flex flex-row">
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
                value={namaGroup ? namaGroup : ""}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
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
            <th>Nama Group</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.namaGroup
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={user._id}>
                <td>
                  <Link
                    to={`/groupStok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {user.kode}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/groupStok/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={getUserById()}
                  >
                    {screenSize >= 600
                      ? user.namaGroup
                      : `${user.namaGroup.substr(0, 15)}...`}
                  </Link>
                </td>
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

export default TampilGroupStok;
