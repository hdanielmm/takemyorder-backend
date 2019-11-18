const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Mesa = require('../models/mesa');

router.get('/', async (req, res, next) => {
  try {
    const mesa = await Mesa.find({});
    mesa.length !== 0
      ? res.status(200).json(mesa)
      : res.status(404).json({ message: "No se encontraron mesas." });
  } catch (error) {
    next(error);
  }
});

router.get('/:mesaId', async (req, res, next) => {
  try {
    const id = req.params.mesaId;
    const mesa = await Mesa.findById(id);
    if (mesa) {
      res.status(200).json(mesa);
    } else {
      res.status(404).json({ message: `No se encontró ningún registro con este id ${id}` })
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const mesa = await Mesa.create({
      _id: new mongoose.Types.ObjectId(),
      numeroMesa: req.body.numero,
      rol: req.body.rol,
      codigoSesion: req.body.codigo,
      estado: req.body.estado
    });
    res.status(201).json({
      message: 'Mesa creada con éxito',
      mesaCreada: {
        mesa_numero: mesa.numeroMesa,
        mesa_estado: mesa.estado
      }
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:mesaId', async (req, res, next) => {
  try {
    const id = req.params.mesaId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const mesa = await Mesa.update({ _id: id }, { $set: updateOps });
    res.status(201).json({
      message: "Mesa actualizada",
      mesa
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:mesaId', async (req, res, next) => {
  try {
    const id = req.params.mesaId;
    const mesa = await Mesa.deleteOne({ _id: id });
    mesa ?
      res.status(201).json({ message: "Mesa borrada", mesa }) :
      res.status(404).json({ message: "No se encontró ninguna mesa con ese id." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;