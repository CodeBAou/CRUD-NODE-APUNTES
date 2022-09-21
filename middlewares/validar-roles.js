const { response } = require('express');
const { removeListener } = require('../models/usuarios');

const esAdminRole = (req, res = response, next ) => {
   
    //No se ha validado el usuario en el middleware anterior
    if( !req.usuario ){ 
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador`
        })
    }

    next();
} 

const tieneRole = ( ...roles ) => {  // < ...resto > tranforma todos los argumentos que se pasen en un array
    
    console.log( roles );

    return ( req, res = response, next ) => {
        
        //No se ha validado el usuario en el middleware anterior
        if( !req.usuario ){ 
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
};