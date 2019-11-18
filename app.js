const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mesaRoutes = require('./api/routes/mesas');
const itemRoutes = require('./api/routes/items');
const pedidoRoutes = require('./api/routes/pedidos');
const barraRoutes = require('./api/routes/barras');
const usuarioRoutes = require('./api/routes/usuario');

mongoose.connect(
  'mongodb+srv://takemyorder:'
  + process.env.MONGO_ATLAS_PW
  + '@takemyorder-z4rqm.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests

app.use('/mesas', mesaRoutes);
app.use('/items', itemRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/barras', barraRoutes);
app.use('/usuario', usuarioRoutes);

app.use((req, res, next) => {
  const error = new Error('Algo no está bien');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;