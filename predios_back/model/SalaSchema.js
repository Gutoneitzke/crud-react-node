const mongoose = require("mongoose");
const Sala = new mongoose.Schema({
    descricao: { type: String, required: true},
    capacidade: { type: Number, required: true },
    andar: {
        type: Number,
        required: true,
        min: [1, 'Mínimo um andar'],
        max: 100
    },
    predio: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'predios', 
        require: true,
    },
    localizacao: { type: String, required: true }
});
module.exports = mongoose.model("sala", Sala);