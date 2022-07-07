import { response, request } from "express";

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

const postUsers = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - postUsers controller",
    nombre,
    edad,
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
