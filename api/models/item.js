const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);