<!--  JALANIN POSTGRES SSQL -->
cmd
psql -U postgres

CREATE DATABASE final_projects; => BUAT DATABASE ini bukan isi
\c final_projects => BUAT MASUK KE DATABASE NYA

CREATE TABLE menu (
     id SERIAL PRIMARY KEY,
     nama VARCHAR(255) NOT NULL,
     deskripsi TEXT,
     harga INT NOT NULL
 ); => BUAT ISI DARI DATABASE NYA

    <!-- INSTALL EXPRESS -->
        npm init -y
        npm install express pg cors dotenv
    <!-- END INSTALL -->

 <!-- ISI DARI DATABASE.JS -->
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

module.exports = client;
<!-- END DB -->
<!-- ENV -->
DB_USER=postgres
DB_HOST=localhost
DB_NAME=menu_pesanan
DB_PASSWORD=password_anda
DB_PORT=5432
<!-- END ENV -->
<!-- BUAT SERVER -->
const express = require('express');
const cors = require('cors');
const client = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk mengambil semua menu
app.get('/api/menu', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM menu');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Endpoint untuk membuat pesanan
app.post('/api/pesanan', async (req, res) => {
    const { menu_id, jumlah } = req.body;
    try {
        const result = await client.query('SELECT harga FROM menu WHERE id = $1', [menu_id]);
        const harga = result.rows[0].harga;
        const total_harga = harga * jumlah;
        await client.query('INSERT INTO pesanan(menu_id, jumlah, total_harga) VALUES ($1, $2, $3)', [menu_id, jumlah, total_harga]);
        res.status(201).json({ message: 'Pesanan berhasil dibuat' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal membuat pesanan' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
<!-- END SERVER -->
<!-- CONTROLLER -->
const db = require('../config/database');

exports.getPesanan = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pesanan');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error: ', err);
    res.status(500).send('Error fetching data');
  }
};

exports.addPesanan = async (req, res) => {
  const { nama_pelanggan, menu, jumlah, total_harga } = req.body;
  try {
    const query = 'INSERT INTO pesanan (nama_pelanggan, menu, jumlah, total_harga) VALUES ($1, $2, $3, $4)';
    await db.query(query, [nama_pelanggan, menu, jumlah, total_harga]);
    res.status(201).send('Pesanan berhasil ditambahkan');
  } catch (err) {
    console.error('Database error: ', err);
    res.status(500).send('Error adding order');
  }
};
<!-- END CONTROLLER -->
node index.js => JALANIN SERVER

<!-- KONEKIN SERVER DENGAN CLIENT -->
npm create vite@latest => VITE
npm install axios

<!-- TEMPLATE APP.JS  -->
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [jumlah, setJumlah] = useState(1);

  useEffect(() => {
    // Ambil data menu dari backend
    axios.get('http://localhost:5000/api/menu')
      .then(response => setMenu(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const handlePesan = () => {
    if (selectedMenu) {
      axios.post('http://localhost:5000/api/pesanan', {
        menu_id: selectedMenu,
        jumlah: jumlah
      })
      .then(response => alert('Pesanan berhasil dibuat!'))
      .catch(error => console.error('Error membuat pesanan:', error));
    }
  };

  return (
    <div>
      <h1>Menu Pesanan</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            <h3>{item.nama}</h3>
            <p>{item.deskripsi}</p>
            <p>Harga: Rp {item.harga}</p>
            <button onClick={() => setSelectedMenu(item.id)}>Pesan</button>
          </li>
        ))}
      </ul>
      
      {selectedMenu && (
        <div>
          <input 
            type="number" 
            value={jumlah} 
            onChange={(e) => setJumlah(e.target.value)} 
            min="1"
          />
          <button onClick={handlePesan}>Konfirmasi Pesanan</button>
        </div>
      )}
    </div>
  );
}

export default App;
<!-- END TEMPLATE -->