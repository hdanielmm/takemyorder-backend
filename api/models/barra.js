const mongoose = require('mongoose');

const barraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rol: { type: String, default: "administrador" },
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Barra', barraSchema);