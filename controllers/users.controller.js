import { response, request } from "express";
import bcryptjs from 'bcryptjs';

import User from '../models/user.model.schema.js'
import { isValidEmail } from "../helpers/db-validators.js";

const getUsers = (req = request, res = response) => {
    const {q, nombre = "No name", apikey, page, limit} = req.query;

  res.json({
    msg: "get API - controller",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const postUsers = async (req = request, res = response) => {


  const {name, email, password, role} = req.body;
  const user = new User({name, email, password, role});

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // Guardar en DB
  await user.save();

  res.json({
    user
  });
};

const putUsers = (req = request, res = response) => {
  const {id} = req.params;

  res.json({
    msg: "put API - putUsers controller",
    id,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - patchUsers controller",
  });
};

const deleteUsers = (req = request, res = response) => {
  res.json({
    msg: "delete API - deleteUsers controller",
  });
};

export { getUsers, postUsers, putUsers, patchUsers, deleteUsers };
