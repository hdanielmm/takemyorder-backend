const mongoose = require('mongoose');

const Pedido = require('../models/pedido');

exports.pedidos_get_all = async (req, res, next) => {
  try {
    const pedido = await Pedido.find({});
    pedido.length !== 0
      ? res.status(200).json({message: "Pedidos", pedido})
      : res.status(404).json({message: "No se encontraron pedidos."});
  } catch (error) {
    next(error);
  }
}

exports.pedidos_create_pedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.create({
      _id: new mongoose.Types.ObjectId(),
      mesaId: req.body.mesaId,
      itemId: req.body.itemId,
      cantidad: req.body.cantidad
    });
    res.status(201).json({
      message: 'El pedido se realizó exitosamente',
      pedido
    });
  } catch (error) {
    next(error);
  }
}

exports.pedidos_get_pedido = async (req, res, next) => {
  try {
    const id = req.params.pedidoId;
    const pedido = await Pedido.findById(id);
    if (pedido) {
      res.status(200).json({ pedido });
    } else {
      res.status(404).json({ message: "No se encontró ningun pedido" });
    }
  } catch (error) {
    next(error);
  }
}

exports.pedidos_delete_pedido = async (req, res, next) => {
  try {
    const id = req.params.pedidoId;
    const pedido = await Pedido.deleteOne({ _id: id });
    if (pedido) {
      res.status(200).json({
        message: 'Pedido borrado',
        pedido
      });
    } else {
      res.status(404).json({ message: "No se encontró ningún pedido" });
    }
  } catch (error) {
    next(error);
  }
}