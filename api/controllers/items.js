const Item = require('../models/item');
const mongoose = require('mongoose');

exports.items_get_all = async (req, res, next) => {
  try {
    const item = await Item.find({});
    item.length !== 0
      ? res.status(200).json({ message: "Items", item })
      : res.status(404).json({ message: "No se encontraron items." });
  } catch (error) {
    next(error);
  }
}

exports.items_create_item = async (req, res, next) => {
  console.log('imagen', req.file);
  try {
    const item = await Item.create({
      _id: new mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      precio: req.body.precio,
      imagen: req.file.path
    });
    res.status(201).json({ message: 'Item creado', item });
  } catch (error) {
    next(error);
  }
}

exports.items_get_item = async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const item = await Item.findById(id);
    if (item) {
      res.status(200).json({ message: "Item encontrado", item });
    } else {
      res.status(404).json({ message: "No se encontró ningún item con ese id: " + id });
    }
  } catch (error) {
    next(error);
  }
}

exports.items_update_item = async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const item = await Item.update({ _id: id }, { $set: updateOps });
    res.status(201).json({ message: "Item actualizado", item });
  } catch (error) {
    next(error);
  }
}

exports.items_delete_item = async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const item = await Item.deleteOne({ _id: id });
    item
      ? res.status(201).json({ message: "Item borrado", item })
      : res.status(404).json({ message: "No se encontró ningún item con ese id." + id });
  } catch (error) {
    next(error);
  }
}