const mongoose = require('mongoose');

const mesaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rol: { type: String, default: "usuario" },
  numeroMesa: { type: Number, required: true },
  codigoSesion: { type: String, required: true },
  estado: { type: String, required: true },
});

module.exports = mongoose.model('Mesa', mesaSchema);