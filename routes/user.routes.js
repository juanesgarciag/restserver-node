import { Router } from "express";
import { check } from "express-validator";
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from "../controllers/users.controller.js";
import { isValidEmail, isValidRole, isValidUserId } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.get("/", getUsers);

router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId),
    check('role').custom(isValidRole),
    validateFields
] ,putUsers);

router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isValidEmail),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', ['USER_ROLE']]),
    check('role', 'Debes seleccionar un Rol de usuario').not().isEmpty(),
    check('role').custom(isValidRole),
    validateFields
] , postUsers);

router.patch("/", patchUsers);

router.delete("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId),
    validateFields
] ,deleteUsers);

export { router };
