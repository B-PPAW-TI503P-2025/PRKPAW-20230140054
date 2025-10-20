const express = require('express');
const cors = require('cors'); // [cite: 80]
const app = express();
const PORT = 3001; 
const morgan = require("morgan");

// Impor router
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");


// Middleware
app.use(cors()); // [cite: 84]
app.use(express.json()); // 
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`); // [cite: 87]
  next(); 
});

app.get('/', (req, res) => {
  res.send('Home Page for API'); // [cite: 90, 91]
});

// Panggil rute buku
const bookRoutes = require('./routes/books'); // [cite: 128]

// Gunakan rute buku dengan prefix /api/books
app.use('/api/books', bookRoutes); // [cite: 129]
app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);


app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`); // [cite: 93, 94]
});