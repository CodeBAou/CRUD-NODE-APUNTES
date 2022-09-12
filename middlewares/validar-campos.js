const { validationResult } = require('express-validator');

//El middleware tiene un tercer argumento que se llama next

const validar = (req, res , next) => {
    //VERIFICACIONES
    //MIDDLEWARE
    //Comprobamos si hay errores en el middleware
    const errors = validationResult(req);
    
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next(); //Sigue con el siguiente middleware
}


module.exports = {
    validar
}