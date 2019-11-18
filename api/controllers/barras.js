const mongoose = require('mongoose');

const Barra = require('../models/barra');

exports.barras_get_all = async (req, res, next) => {
  try {
    const barra = await Barra.find({});
    barra.length !== 0
      ? res.status(200).json({ message: "Barra", barra })
      : res.status(404).json({ message: "No se encontraron barras." });
  } catch (error) {
    next(error);
  }
}

exports.barras_get_barra = async (req, res, next) => {
  try {
    const id = req.params.barraId;
    const barra = await Barra.findById(id);
    if (barra) {
      res.status(200).json(barra);
    } else {
      res.status(404).json({ message: `No se encontró ningún registro con este id ${id}` })
    }
  } catch (error) {
    next(error);
  }
}

exports.barras_create_barra = async (req, res, next) => {
  try {
    const barra = await Barra.create({
      _id: new mongoose.Types.ObjectId(),
      rol: req.body.rol,
      nombre: req.body.nombre
    });
    res.status(201).json({
      message: 'Barra creada',
      barra
    });
  } catch (error) {
    next(error);
  }
}

exports.barras_update_barra = async (req, res, next) => {
  try {
    const id = req.params.barraId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const barra = await Barra.update({ _id: id }, { $set: updateOps });
    res.status(201).json({
      message: "Barra actualizada",
      barra
    });
  } catch (error) {
    next(error);
  }
}

exports.barras_delete_barra = async (req, res, next) => {
  try {
    const id = req.params.barraId;
    const barra = await Barra.deleteOne({ _id: id });
    barra ?
      res.status(201).json({ message: "Barra borrada", barra }) :
      res.status(404).json({ message: "No se encontró ninguna barra con ese id." });
  } catch (error) {
    next(error);
  }
}