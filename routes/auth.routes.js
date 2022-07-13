import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";

const auth = Router();

auth.post('/login', [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
],login)





export {auth};