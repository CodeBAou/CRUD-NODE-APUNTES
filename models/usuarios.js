const { Schema, model } = require('mongoose');

//Se define el Schema para los documento mongo de usuarios
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio '], // requerio true/false, mensaje error
        unique: true //mongoose se encarga de no guardar correos duplicados

    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] //Define Tipos 
    },
    estado: {
        type: Boolean,
        default: true     //Se marca el false al borrarlo
    },
    google: {
        type:Boolean,
        default: false
    }
});

//model() - funcion pone nombre a la coleccion de mongo y se le pasa el Schema

module.exports = model( 'Usuario', UsuarioSchema);//Si pones Usuario mongo por la 's' para el plural automaticamente