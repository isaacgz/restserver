const { Categoria, Role, Usuario } = require('../models');


const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);            
    }
}

const emailExiste = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya está registrado en la BD`);            
    }
}

const existeUsuarioPorId = async(id ) =>{
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${ id } no existe`);            
    }
}

const existeCategoriaPorID = async(id) =>{
    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`La categoria ${ categoria } no existe`);            
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorID
}