import React, { useState } from 'react';
import './App.css';

function App() {
  const [nama, setNama] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h2>Masukkan Nama Anda:</h2>
        <input
          type="text"
          placeholder="Ketik nama di sini..."
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{ padding: '10px', fontSize: '18px', margin: '20px' }}
        />
        {/* Pesan akan ditampilkan jika nama sudah diisi */}
        {nama && <h1>Hello, {nama}!</h1>}
      </header>
    </div>
  );
}

export default App;