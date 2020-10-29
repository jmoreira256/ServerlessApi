const mongoose = require ('mongoose')

const Movies = mongoose.model('Movie', {
    nombre: String,
    genero: String,
    descripcion: String
})

module.exports = Movies