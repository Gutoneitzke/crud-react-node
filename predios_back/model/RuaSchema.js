const mongoose = require("mongoose");

const Rua = new mongoose.Schema({
    descricao: { type: String, required: true, unique:true },
});

module.exports = mongoose.model("rua", Rua);