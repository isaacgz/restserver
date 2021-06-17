const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeProductoPorID, existeCategoriaPorID } = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

//obtener todas las productos - publico
router.get('/', obtenerProductos);

//obtener producto por id publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], obtenerProducto);

//crear producto - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorID ),
    validarCampos
] , crearProducto);

// actualizar una producto - admin
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
] ,actualizarProducto);

// borrar una producto - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], borrarProducto);

module.exports = router;