const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

exports.usuarios_get_all = async (req, res, next) => {
  try {
    const usuario = await Usuario.find({});
    usuario.length !== 0
      ? res.status(200).json({message: "Usuarios", usuario})
      : res.status(404).json({message: "No se encontraron usuarios."});
  } catch (error) {
    next(error);
  }
}

exports.usuarios_signup_usuario = async (req, res, next) => {
  const email = await Usuario.find({ email: req.body.email });
  if (email.length >= 1) {
    return res.status(409).json({ message: 'El email ya existe' });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        try {
          const usuario = await Usuario.create({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          console.log('usuario creado:', usuario);
          res.status(201).json({ message: "Usuario creado" });
        } catch (error) {
          next(error);
        }
      }
    })
  }
}

exports.usuarios_login_usuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    console.log('usuario', process.env.JWT_KEY);
    if (usuario.length < 1) {
      return res.status(401).json({ message: 'La utenticación falló' });
    }
    bcrypt.compare(req.body.password, usuario.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'La utenticación falló' });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: usuario.email,
            userId: usuario.id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        return res.status(200).json({ message: 'Autenticación exitosa', token: token });
      }
      res.status(401).json({ message: "La autenticación falló" });
    });
  } catch (error) {
    next(error);
  }
}

exports.usuarios_delete_usuario = async (req, res, next) => {
  try {
    const id = req.params.usuarioId;
    const usuario = await Usuario.deleteOne({ _id: id });
    usuario ?
      res.status(201).json({ message: "Usuario borrado", usuario }) :
      res.status(404).json({ message: "No se encontró ninguna usuario con ese id." });
  } catch (error) {
    next(error);
  }
}