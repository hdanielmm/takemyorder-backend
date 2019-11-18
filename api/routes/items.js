const express = require('express');
const router = express.Router();

const multer = require('multer');

const ItemsControllers = require('../controllers/items');

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

router.get('/', ItemsControllers.items_get_all);

router.post('/', upload.single('itemImagen'), ItemsControllers.items_create_item);

router.get('/:itemId', ItemsControllers.items_get_item);

router.patch('/:itemId', ItemsControllers.items_update_item);

router.delete('/:itemId', ItemsControllers.items_delete_item);

module.exports = router;