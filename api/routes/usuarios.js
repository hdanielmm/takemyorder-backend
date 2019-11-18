const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const Usuario = require('../models/usuario');

const UsuariosControllers = require('../controllers/usuarios');

router.get("/", UsuariosControllers.usuarios_get_all);

router.post("/signup", UsuariosControllers.usuarios_signup_usuario);

router.post('/login', UsuariosControllers.usuarios_login_usuario);

router.delete('/:usuarioId', UsuariosControllers.usuarios_delete_usuario);

module.exports = router;