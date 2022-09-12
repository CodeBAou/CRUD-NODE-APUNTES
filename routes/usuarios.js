const { Router }        = require('express');
const { check }         = require('express-validator');
const { validar }       = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDel, usuarioPath} = require('../controllers/usuarios');
const { esRolValidado, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router            = Router();

//Rutas de nuestra api pasando las funciones del controlador, se hacen validaciones por middlewar
// con la ayuda del Paquete express-validator
router.get('/', usuariosGet );

router.post('/', [
    //middlewareS :: valida campo del body [nombre,tipo]
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password','El password debe ser  mas de 6 letras').isLength({min:6}),
    check('rol').custom(  esRolValidado ),
    check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), 
    validar //Comprueba que no hay errores en los checks
], usuariosPost );//Funcion que se ejecuta en esta ruta (Controlador)


router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom(  esRolValidado ),
    validar//Comprouba que no hay errores en lo checks
],usuariosPut );

router.delete('/:id',[ 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validar//Comprouba que no hay errores en lo checks
],usuariosDel);

router.patch('/', usuarioPath);

//INSERTAR MIDDLEWARE EN LA RUTA 

// ruta sin middleware    ::    router.patch('/', usuarioPath);
// ruta con middleware    ::    router.patch('/', fnMidleware, usuarioPath);
// ruta varios middleware ::    router.patch('/', [ fnMidleware1, fnMidleware2, ... ], usuarioPath );
// fnMidleware = funcion middleware

//Si hacemos las validaciones de esta manera en cada una de la peticiones...
/*
    router.post('/', [

        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('correo','el correo no es valido').isEmail(),
        check('password','El password debe ser  mas de 6 letras').isLength({min:6}),
        check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),

    ], usuariosPost );

    Tendremos codigo redundante y hay que optimizarlo
*/

module.exports = router;