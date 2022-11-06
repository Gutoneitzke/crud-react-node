const mongoose = require("mongoose");

const Tipo = new mongoose.Schema({
    descricao: { type: String, required: true, unique:true },
});

module.exports = mongoose.model("tipo", Tipo);