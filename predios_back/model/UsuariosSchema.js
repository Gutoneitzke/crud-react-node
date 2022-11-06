const mongoose = require("mongoose");
const Usuario = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    celular: String,
    senha: String,
    dataHoraCad: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Usuario", Usuario);