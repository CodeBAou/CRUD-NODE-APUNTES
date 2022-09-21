const { response }   = require('express');
const Usuario        = require('../models/usuarios');
const bcryptjs       = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response)  => {

    const { correo, password } = req.body;

    try{

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password: false'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({ //SOLO SE PUEDE TENER UN res.json() en todo el controlador
            usuario,
            token
        });
    
    }catch( error ){
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
}

module.exports = {
    login
} 