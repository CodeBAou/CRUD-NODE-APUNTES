//Al apuntar a la carpeta middlewares js accede al index.js (igual que en html)

const validar     = require('../middlewares/validar-campos'); // Importacion 1
const validarJWT  = require('../middlewares/validar-jwt'); // Importacion 2
const validaRoles = require('../middlewares/validar-roles'); // Importacion 3

module.exports = {  // ... Accede a todo lo que exporte cada fichero 
    ...validar,
    ...validarJWT,
    ...validaRoles
}