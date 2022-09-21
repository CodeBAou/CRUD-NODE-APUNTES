const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

//midleware se dispara con tres argumentos ( request, response, next)
const validarJWT = async( req = request, res = response, next ) => {
    
    const token  = req.header('x-token'); //Recogemos el header que queremoss
    
    if( !token ){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try{
        //Obtenemos el uid del token
        const {uid}   = jwt.verify( token, process.env.SECRETOPRIVATEKEY );
        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'El usuario que desea eliminar no existe '
            });
        }

        //Verificar si el uid tiene el estado el true (no ha sido eliminado)
        if ( !usuario.estado ) {
            return res.status(401).json( { 
                msg: 'Tokejn no valido - usuario con estado: false'
            } );
        }

        req.usuario      = usuario;
        next();

    }catch( error ){
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    
}

module.exports = {
    validarJWT
}