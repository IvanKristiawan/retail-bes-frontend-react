import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader } from "../../components";
import { ShowTableDaftarPenjualanStok } from "../../components/ShowTable";
import SearchBar from "../../components/SearchBar";
import ButtonGroup1 from "../../components/ButtonGroup1";

const TampilDaftarPenjualanStok = () => {
  const { screenSize } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const kode = null;

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks`);
    setUser(response.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.nomorNota.includes(searchTerm) ||
      val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
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
      <Header category="Transaksi" title="Daftar Penjualan Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <ButtonGroup1
          id={"/"}
          kode={kode}
          addLink={`/daftarPenjualanStok/penjualanStok/tambahPenjualanStok`}
          editLink={`/`}
          deleteUser={"/"}
        />
        <SearchBar setSearchTerm={setSearchTerm} screenSize={screenSize} />
      </div>
      <ShowTableDaftarPenjualanStok
        currentPosts={currentPosts}
        searchTerm={searchTerm}
      />
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

export default TampilDaftarPenjualanStok;
