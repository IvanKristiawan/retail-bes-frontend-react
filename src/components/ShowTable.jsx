import React from "react";
import { Link } from "react-router-dom";

export function ShowTableSupplier({ screenSize, currentPosts, searchTerm }) {
  return (
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
            if (searchTerm === "") {
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
                <a
                  href={`/supplier/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.kode}
                </a>
              </td>
              <td>
                <a
                  href={`/supplier/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {screenSize >= 600
                    ? user.namaSupplier
                    : `${user.namaSupplier.substr(0, 15)}...`}
                </a>
              </td>
              <td className="is-hidden-mobile">{user.alamatSupplier}</td>
              <td className="is-hidden-mobile">{user.kota}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function ShowTableGroupStok({ screenSize, currentPosts, searchTerm }) {
  return (
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
            if (searchTerm === "") {
              return val;
            } else if (
              val.namaGroup.toUpperCase().includes(searchTerm.toUpperCase()) ||
              val.kode.toUpperCase().includes(searchTerm.toUpperCase())
            ) {
              return val;
            }
          })
          .map((user, index) => (
            <tr key={user._id}>
              <td>
                <a
                  href={`/groupStok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.kode}
                </a>
              </td>
              <td>
                <a
                  href={`/groupStok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {screenSize >= 600
                    ? user.namaGroup
                    : `${user.namaGroup.substr(0, 15)}...`}
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function ShowTableStok({
  screenSize,
  currentPosts,
  searchTerm,
  getUserById,
}) {
  return (
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
            if (searchTerm === "") {
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
                <a
                  href={`/stok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.kode}
                </a>
              </td>
              <td>
                <a
                  href={`/stok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {screenSize >= 600
                    ? user.namaStok
                    : `${user.namaStok.substr(0, 15)}...`}
                </a>
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
  );
}

export function ShowTableDaftarPembelianStok({
  currentPosts,
  searchTerm,
  suppliers,
}) {
  return (
    <table className="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th>No. Nota</th>
          <th>Tanggal</th>
          <th className="is-hidden-mobile">Jenis</th>
          <th className="is-hidden-mobile">Kode Supplier</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts
          .filter((val) => {
            if (searchTerm === "") {
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
                  .filter((supplier) => supplier.kode === user.kodeSupplier)
                  .map((sup) => ` ${sup.namaSupplier}`)}
              </td>
              <td>{user.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function ShowTablePembelianStok({ id, currentPosts, stoks, nomorNota }) {
  return (
    <table className="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th className="is-hidden-mobile">Kode Stok</th>
          <th>Nama Stok</th>
          <th className="is-hidden-mobile">Qty</th>
          <th className="is-hidden-mobile">Harga</th>
          <th className="is-hidden-mobile">Potongan</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts
          .filter((val) => {
            if (val.nomorNota === nomorNota) {
              return val;
            }
          })
          .map((aPembelianStok, index) => (
            <tr key={aPembelianStok.kodeStok}>
              <td className="is-hidden-mobile">
                <a
                  href={`/daftarPembelianStok/pembelianStok/${id}/${aPembelianStok._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {aPembelianStok.kodeStok}
                </a>
              </td>
              <td>
                <a
                  href={`/daftarPembelianStok/pembelianStok/${id}/${aPembelianStok._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {stoks
                    .filter((stok) => stok.kode === aPembelianStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </a>
              </td>
              <td className="is-hidden-mobile">{aPembelianStok.qty}</td>
              <td className="is-hidden-mobile">{aPembelianStok.hargaSatuan}</td>
              <td className="is-hidden-mobile">{aPembelianStok.potongan}</td>
              <td>{aPembelianStok.subtotal}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function ShowTableDaftarPenjualanStok({ currentPosts, searchTerm }) {
  return (
    <table className="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th>No. Nota</th>
          <th>Tanggal</th>
          <th className="is-hidden-mobile">Jenis</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.nomorNota.includes(searchTerm) ||
              val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
              val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
            ) {
              return val;
            }
          })
          .map((user, index) => (
            <tr key={user._id}>
              <td>
                <Link
                  to={`/daftarPenjualanStok/penjualanStok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.nomorNota}
                </Link>
              </td>
              <td>
                <Link
                  to={`/daftarPenjualanStok/penjualanStok/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.updatedAt.slice(8, 10)}-{user.updatedAt.slice(5, 7)}-
                  {user.updatedAt.slice(0, 4)}
                </Link>
              </td>
              <td className="is-hidden-mobile">{user.jenis}</td>
              <td>{user.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function ShowTablePenjualanStok({
  id,
  currentPosts,
  stoks,
  nomorNota,
}) {
  return (
    <table className="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th className="is-hidden-mobile">Kode Stok</th>
          <th>Nama Stok</th>
          <th className="is-hidden-mobile">Qty</th>
          <th className="is-hidden-mobile">Harga</th>
          <th className="is-hidden-mobile">Potongan</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts
          .filter((val) => {
            if (val.nomorNota === nomorNota) {
              return val;
            }
          })
          .map((aPenjualanStok, index) => (
            <tr key={aPenjualanStok.kodeStok}>
              <td className="is-hidden-mobile">
                <a
                  href={`/daftarPenjualanStok/penjualanStok/${id}/${aPenjualanStok._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {aPenjualanStok.kodeStok}
                </a>
              </td>
              <td>
                <a
                  href={`/daftarPenjualanStok/penjualanStok/${id}/${aPenjualanStok._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {stoks
                    .filter((stok) => stok.kode === aPenjualanStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </a>
              </td>
              <td className="is-hidden-mobile">{aPenjualanStok.qty}</td>
              <td className="is-hidden-mobile">{aPenjualanStok.hargaSatuan}</td>
              <td className="is-hidden-mobile">{aPenjualanStok.potongan}</td>
              <td>{aPenjualanStok.subtotal}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
