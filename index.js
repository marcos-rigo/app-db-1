const express = require('express');
const connectDB = require('./db/db');
const app = express();
const usersRoutes = require('./routes/usersRoutes');
require('dotenv').config();

connectDB();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());


app.use('/users', usersRoutes)

app.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}...`));