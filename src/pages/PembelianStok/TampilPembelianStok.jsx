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
import { ShowTablePembelianStok } from "../../components/ShowTable";

const TampilPembelianStok = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [total, setTotal] = useState("");
  const [aPembelianStoks, setAPembelianStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    getSupplier();
    getStoks();
    getAPembelianStoks();
    {id && getUserById()}
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
  };

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPembelianStoks`);
    setAPembelianStok(response.data);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setJenis(response.data.jenis);
      setKodeSupplier(response.data.kodeSupplier);
      setTotal(response.data.total);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPembelianStok of aPembelianStoks) {
        for (let stok of stoks) {
          if (aPembelianStok.kodeStok === stok.kode) {
            let newQty = stok.qty - aPembelianStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty,
            });
            await axios.delete(
              `${tempUrl}/aPembelianStoks/${aPembelianStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/pembelianStoks/${id}`);
      setLoading(false);
      navigate("/daftarPembelianStok");
    } catch (error) {
      console.log(error);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = aPembelianStoks.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="columns flex flex-col"
      style={{ padding: screenSize >= 600 ? "5rem" : "1rem" }}
    >
      <Header category="Transaksi" title="Pembelian Stok" />
      <div
        className="flex flex-wrap"
        style={{
          justifyContent: screenSize <= 600 ? "center" : "space-between",
        }}
      >
        <div>
          <Link
            to={`/daftarPembelianStok/pembelianStok/${id}/tambahAPembelianStok`}
            className="button is-success is-small"
          >
            +Tambah Stok
          </Link>
          <Link
            to={`/daftarPembelianStok/pembelianStok/${id}/edit`}
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
          <div className="field">
            <label className="label">Kode Supplier</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={`${kodeSupplier} - ${suppliers
                  .filter((supplier) => supplier.kode === kodeSupplier)
                  .map((sup) => ` ${sup.namaSupplier}`)}`}
                onChange={(e) => setKodeSupplier(e.target.value)}
                placeholder="Kode Supplier"
                disabled
              />
            </div>
          </div>
          <ShowList name="Total" value={total} setValue={setTotal} />
        </div>
      </div>
      <ShowTablePembelianStok
        id={id}
        currentPosts={currentPosts}
        stoks={stoks}
        nomorNota={nomorNota}
      />
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={aPembelianStoks.length}
          screenSize={screenSize}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default TampilPembelianStok;
