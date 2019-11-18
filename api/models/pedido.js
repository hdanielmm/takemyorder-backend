const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mesaId: { type: mongoose.Schema.Types.ObjectId, ref: "Mesa", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  cantidad: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);