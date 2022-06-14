import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  TambahSupplier,
  UbahSupplier,
  TampilSupplier,
  TampilGroupStok,
  TambahGroupStok,
  UbahGroupStok,
  TampilStok,
  TambahStok,
  UbahStok,
  TampilDaftarPembelianStok,
  TampilPembelianStok,
  TambahPembelianStok,
  UbahPembelianStok,
  TambahAPembelianStok,
  TampilAPembelianStok,
  TampilDaftarPenjualanStok,
  TambahPenjualanStok,
  TampilPenjualanStok,
  UbahPenjualanStok,
  TambahAPenjualanStok,
  TampilAPenjualanStok,
  Ecommerce,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Master */}
                  {/* Supplier */}
                <Route path="/supplier" element={<TampilSupplier />} />
                <Route
                  path="/supplier/tambahSupplier"
                  element={<TambahSupplier />}
                />
                <Route path="/supplier/:id" element={<TampilSupplier />} />
                <Route path="/supplier/:id/edit" element={<UbahSupplier />} />
                  {/* Group Stok */}
                <Route path="/groupStok" element={<TampilGroupStok />} />
                <Route
                  path="/groupStok/tambahGroupStok"
                  element={<TambahGroupStok />}
                />
                <Route path="/groupStok/:id" element={<TampilGroupStok />} />
                <Route path="/groupStok/:id/edit" element={<UbahGroupStok />} />
                  {/* Stok */}
                <Route path="/stok" element={<TampilStok />} />
                <Route path="/stok/:id" element={<TampilStok />} />
                <Route path="/stok/:id/edit" element={<UbahStok />} />
                <Route path="/stok/tambahStok" element={<TambahStok />} />
                  {/* Pembelian Stok */}
                <Route path="/daftarPembelianStok" element={<TampilDaftarPembelianStok />} />
                <Route path="/daftarPembelianStok/pembelianStok/tambahPembelianStok" element={<TambahPembelianStok />} />
                <Route path="/daftarPembelianStok/pembelianStok/:id" element={<TampilPembelianStok />} />
                <Route path="/daftarPembelianStok/pembelianStok/:id/edit" element={<UbahPembelianStok />} />
                  {/* A Pembelian Stok */}
                <Route path="/daftarPembelianStok/pembelianStok/:id/tambahAPembelianStok" element={<TambahAPembelianStok />} />
                <Route path="/daftarPembelianStok/pembelianStok/:id/:idAPembelianStok" element={<TampilAPembelianStok />} />
                  {/* Penjualan Stok */}
                <Route path="/daftarPenjualanStok" element={<TampilDaftarPenjualanStok />} />
                <Route path="/daftarPenjualanStok/penjualanStok/tambahPenjualanStok" element={<TambahPenjualanStok />} />
                <Route path="/daftarPenjualanStok/penjualanStok/:id" element={<TampilPenjualanStok />} />
                <Route path="/daftarPenjualanStok/penjualanStok/:id/edit" element={<UbahPenjualanStok />} />
                  {/* A Penjualan Stok */}
                <Route path="/daftarPenjualanStok/penjualanStok/:id/tambahAPenjualanStok" element={<TambahAPenjualanStok />} />
                <Route path="/daftarPenjualanStok/penjualanStok/:id/:idAPenjualanStok" element={<TampilAPenjualanStok />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
