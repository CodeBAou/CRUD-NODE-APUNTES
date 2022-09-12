const { response, request } = require( 'express' );
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
//PARAMETROS URL
//http://localhost:8080/api/usuarios?q=hola&nombre=boris&apikey=12345678

//CONTROLADOR USUARIOS
//En el controlador guardamos el tratamiento de las respuestas
const usuariosGet = async(req = require, res = response ) => {

    //{{url}}/api/usuarios?desde=0&limite=6

    const { desde, limite } = req.query;
    const query = {estado: true};

    /*NO SE EJECUTABAN DE FORMA SIMULTANEA, LA RESPUESTA SE DEMORA MAS
    const usuarios = await Usuario.find( {estado:true} )
        .skip( Number( desde) )
        .limit( limite );

    const total = await Usuario.countDocuments();
    */

    //SE EJECUTAN 2 PROMESAS DE FORMA SIMULTANEA, SE AHORRA TIEMPO EN RESPUESTA
    //Se lanzan las funciones anteriores de forma simultanea
    const [total, usuarios] = await Promise.all([ 
        Usuario.countDocuments( query ), 
        Usuario.find( query )
            .skip( Number(desde) )             //Promise.all() - Devuelve coleccion de Promesas
            .limit( limite )
    ])

    res.json({ 
        total,
        usuarios
    });
}

const usuariosPost = async (req , res = response) => {

    //Desestructuracion del body
    const { nombre, correo, password, rol } = req.body;
    //Creamos la instancia del Schema usuarios
    const usuario    = new Usuario( {nombre, correo, password, rol} ); 
    
    //Encriptar la contraseña - Paquete bcryptjs 
    const salt       = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt); //Encriptamos la contraseña en el objecto 

    //Guardamos el documento en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut  = async ( req , res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Verifica que el id existe en la base de datos
    if ( password ){
        //Ecriptar la contraseña
        const salt     = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password , salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json( usuario );

} ;

const usuariosDel  = async(req, res = response) => {
    
    const { id } = req.params;  
    //Borra usuario por id Fisicamente
    const usuario = await Usuario.findByIdAndDelete(id); //

    res.json({
        usuario
    });
};

const usuarioPath = (req, res = response) => {
    res.json({
        msg:'path API - controlador'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDel,
    usuarioPath
}