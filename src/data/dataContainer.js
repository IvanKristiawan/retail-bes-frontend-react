import React from 'react';
import { AiOutlineCodepen, AiOutlineDatabase, AiOutlineBarChart, AiOutlineBars, AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';

export const tempUrl = "https://retail-bes.herokuapp.com";

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        link: 'ecommerce',
        name: 'Performa',
        icon: <AiOutlineBarChart />,
      },
    ],
  },

  {
    title: 'Master',
    links: [
      {
        link: 'supplier',
        name: 'supplier',
        icon: <AiOutlineCodepen />,
      },
      {
        link: 'groupStok',
        name: 'group Stok',
        icon: <AiOutlineBars />,
      },
      {
        link: 'stok',
        name: 'stok',
        icon: <AiOutlineDatabase />,
      }
    ],
  },

  {
    title: 'Transaksi',
    links: [
      {
        link: 'daftarPembelianStok',
        name: 'pembelian Stok',
        icon: <AiOutlineMenuUnfold />,
      },
      {
        link: 'daftarPenjualanStok',
        name: 'penjualan Stok',
        icon: <AiOutlineMenuFold />,
      },
    ],
  },
];
