import { response, request } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.schema.js";

const getUsers = async (req = request, res = response) => {
  // const {q, nombre = "No name", apikey, page, limit} = req.query;

  const {limit = 5, from = 0} = req.query;
  const query = {state: true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query) // state: true devuelve solo los usuario con el state en true
      .limit(Number(limit))
      .skip(Number(from))
  ]);

  res.json({total, users});
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await user.save();

  res.json(user);
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - patchUsers controller",
  });
};

const deleteUsers = async (req = request, res = response) => {

  const {id} = req.params;

  //Borrado fisico
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, {state: false});

  res.json(user);
};

export { getUsers, postUsers, putUsers, patchUsers, deleteUsers };
