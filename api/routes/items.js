const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  try {
    const item = await Item.find({});
    item.length !== 0
      ? res.status(200).json({ message: "Items", item })
      : res.status(404).json({ message: "No se encontraron items." });
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.single('itemImagen'), async (req, res, next) => {
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
});

router.get('/:itemId', async (req, res, next) => {
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
});

router.patch('/:itemId', async (req, res, next) => {
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
});

router.delete('/:itemId', async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const item = await Item.deleteOne({ _id: id });
    item
      ? res.status(201).json({ message: "Item borrado", item })
      : res.status(404).json({ message: "No se encontró ningún item con ese id." + id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;