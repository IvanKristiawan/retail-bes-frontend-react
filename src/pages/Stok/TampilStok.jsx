import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader, ShowList } from "../../components";
import { ShowTableStok } from "../../components/ShowTable";
import SearchBar from "../../components/SearchBar";
import ButtonGroup1 from "../../components/ButtonGroup1";

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
    {
      id && getUserById();
    }
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
    if (searchTerm === "") {
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
        <ButtonGroup1
          id={id}
          kode={kode}
          addLink={`/stok/tambahStok`}
          editLink={`/stok/${id}/edit`}
          deleteUser={deleteUser}
        />
        <SearchBar setSearchTerm={setSearchTerm} screenSize={screenSize} />
      </div>

      {gambar && (
        <div
          className="flex justify-center"
          style={{
            marginTop: screenSize <= 600 ? "20px" : "0",
          }}
        >
          <Image
            style={{ width: "200px", borderRadius: "20px" }}
            cloudName="dbtag5lau"
            publicId={gambar ? gambar : ""}
          />
        </div>
      )}

      <div
        className="flex flex-row"
        style={{
          flexDirection: screenSize <= 600 ? "column" : "row",
        }}
      >
        <div className="column is-half">
          <ShowList name="Kode Group" value={kodeGrup} setValue={setKodeGrup} />
          <ShowList name="Kode" value={kode} setValue={setKode} />
          <ShowList name="Nama" value={namaStok} setValue={setNama} />
          <ShowList name="Merk" value={merk} setValue={setMerk} />
          <ShowList name="Quantity" value={qty} setValue={setQty} />
        </div>
        <div className="column is-half">
          <ShowList
            name="Satuan Kecil"
            value={satuanKecil}
            setValue={setSatuanKecil}
          />
          <ShowList
            name="Satuan Besar"
            value={satuanBesar}
            setValue={setSatuanBesar}
          />
          <ShowList name="Konversi" value={konversi} setValue={setKonversi} />
          <ShowList
            name="Harga Jual Kecil"
            value={hargaJualKecil}
            setValue={setHargaJualKecil}
          />
          <ShowList
            name="Harga Jual Besar"
            value={hargaJualBesar}
            setValue={setHargaJualBesar}
          />
        </div>
      </div>
      <ShowTableStok
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

export default TampilStok;
