import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { tempUrl } from "../../data/dataContainer";
import { Pagination, Loader, ShowList } from "../../components";
import { ShowTablePenjualanStok } from "../../components/ShowTable";

const TampilPenjualanStok = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [total, setTotal] = useState("");
  const [aPenjualanStoks, setAPenjualanStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    getStoks();
    getAPenjualanStoks();
    {id && getUserById()}
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPenjualanStoks`);
    setAPenjualanStok(response.data);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setJenis(response.data.jenis);
      setTotal(response.data.total);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPenjualanStok of aPenjualanStoks) {
        for (let stok of stoks) {
          if (aPenjualanStok.kodeStok === stok.kode) {
            let newQty = stok.qty + aPenjualanStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty,
            });
            await axios.delete(
              `${tempUrl}/aPenjualanStoks/${aPenjualanStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/penjualanStoks/${id}`);
      setLoading(false);
      navigate("/daftarPenjualanStok");
    } catch (error) {
      console.log(error);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = aPenjualanStoks.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Transaksi" title="Penjualan Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link
            to={`/daftarPenjualanStok/penjualanStok/${id}/tambahAPenjualanStok`}
            className="button is-success is-small"
          >
            +Tambah Stok
          </Link>
          <Link
            to={`/daftarPenjualanStok/penjualanStok/${id}/edit`}
            className="button is-info is-small"
          >
            <AiOutlineEdit /> Ubah
          </Link>
          <button
            onClick={() => deleteUser(id)}
            className="button is-danger is-small"
          >
            <AiOutlineDelete /> Hapus
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="column is-half">
          <ShowList
            name="Nomor Nota"
            value={nomorNota}
            setValue={setNomorNota}
          />
          <ShowList name="Jenis" value={jenis} setValue={setJenis} />
          <ShowList name="Total" value={total} setValue={setTotal} />
        </div>
      </div>
      <ShowTablePenjualanStok
        id={id}
        currentPosts={currentPosts}
        stoks={stoks}
        nomorNota={nomorNota}
      />
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={aPenjualanStoks.length}
          screenSize={screenSize}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default TampilPenjualanStok;
