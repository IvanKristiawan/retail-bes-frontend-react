import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader, ShowList } from "../../components";
import { ShowTableGroupStok } from "../../components/ShowTable";
import SearchBar from "../../components/SearchBar";
import ButtonGroup1 from "../../components/ButtonGroup1";

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
    {
      id && getUserById();
    }
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
    if (searchTerm === "") {
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
        <ButtonGroup1
          id={id}
          kode={kode}
          addLink={`/groupStok/tambahGroupStok`}
          editLink={`/groupStok/${id}/edit`}
          deleteUser={deleteUser}
        />
        <SearchBar setSearchTerm={setSearchTerm} screenSize={screenSize} />
      </div>
      <div className="flex flex-row">
        <div className="column is-half">
          <ShowList name="Kode" value={kode} setValue={setKode} />
          <ShowList name="Nama" value={namaGroup} setValue={setNama} />
        </div>
      </div>
      <ShowTableGroupStok
        currentPosts={currentPosts}
        searchTerm={searchTerm}
        getUserById={getUserById}
        screenSize={screenSize}
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

export default TampilGroupStok;
