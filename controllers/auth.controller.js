import { response, request } from "express";
import bcryptjs from 'bcryptjs';

import User from '../models/user.model.schema.js' 
import { generateJWT } from "../helpers/generate-jwt.js";

const login = async (req, res = response) =>{

    const {email, password} = req.body;

    try {

        // Verificar que el usuario exista
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario y/o Password no son correctos'
            });
        };

        // Verificar si el usuario esta activo
        if(!user.state){
            return res.status(400).json({
                msg: 'El usuario no se encuentra registrado'
            });
        };

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario y/o Password no son correctos'
            });
        };

        //Generar el JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export {login};