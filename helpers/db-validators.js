const Role            = require('../models/rol');
const Usuario         = require('../models/usuarios');


const esRolValidado   = async ( rol = '' ) => {  //Middleware personalizado, busca si existe ese rol en la base de datos

    const existeRol = await Role.findOne( { rol } );
    
    if( !existeRol ){
        //El rol recibido no existe!, se devuelve un error
        throw new Error(`El rol ${  rol } no está regstrado en la DB`);//Este error no interrumpe el programa, es un error personalizado para el metodo custom()
    }    
}

//Verificar si el correo existe en la base de datos
const emailExiste = async ( correo = '') => {

    const existeEmail = await Usuario.findOne( {correo} );
    if( existeEmail ) {
      throw new Error(`El correo ${correo} ya esta registrado`);
    }

}

const existeUsuarioPorId = async( id )=>{
    //Verifica si el usuario con ese id existe en la base de datos
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`No existe ningun usuario con el ID ${id}`);
    }
}

module.exports = {
    esRolValidado,
    emailExiste,
    existeUsuarioPorId
}