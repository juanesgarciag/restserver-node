import Role from "../models/role.model.schema.js";
import User from "../models/user.model.schema.js"

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}

//Valida si el correo ya existe en DB
const isValidEmail = async ( email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error (`El correo ${email} ya se encuentra registrado.`);
    }
};

export {isValidRole, isValidEmail};