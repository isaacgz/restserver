const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorID } = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRole, tieneRole } = require("../middlewares");

const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//obtener categoria por id publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], obtenerCategoria);

//crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria);

// actualizar una categoria - admin
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    check('id').custom( existeCategoriaPorID ),
    validarCampos
] ,actualizarCategoria);

// borrar una categoria - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], borrarCategoria);

module.exports = router;