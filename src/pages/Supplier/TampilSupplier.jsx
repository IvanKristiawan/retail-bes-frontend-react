import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader, ShowList } from "../../components";
import { ShowTableSupplier } from "../../components/ShowTable";
import SearchBar from "../../components/SearchBar";
import ButtonGroup1 from "../../components/ButtonGroup1";

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
    {
      id && getUserById();
    }
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
    if (searchTerm === "") {
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
        <ButtonGroup1
          id={id}
          kode={kode}
          addLink={`/supplier/tambahSupplier`}
          editLink={`/supplier/${id}/edit`}
          deleteUser={deleteUser}
        />
        <SearchBar setSearchTerm={setSearchTerm} screenSize={screenSize} />
      </div>
      <div
        className="flex flex-row"
        style={{
          flexDirection: screenSize <= 600 ? "column" : "row",
        }}
      >
        <div className="column is-half">
          <ShowList name="Kode" value={kode} setValue={setKode} />
          <ShowList name="Nama" value={namaSupplier} setValue={setNama} />
          <ShowList name="Alamat" value={alamatSupplier} setValue={setAlamat} />
        </div>
        <div className="column is-half">
          <ShowList name="Kota" value={kota} setValue={setKota} />
          <ShowList name="Telpon" value={telp} setValue={setTelp} />
          <ShowList name="NPWP" value={npwp} setValue={setNpwp} />
        </div>
      </div>
      <ShowTableSupplier
        screenSize={screenSize}
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

export default TampilSupplier;
