const mongoose = require("mongoose");

const Predio = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    sigla: { type: String, required: true, unique: true },
    andares: {
        type: Number,
        required: true,
        min: [1, 'Mínimo um andar'],
        max: 100
    },
    rua: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rua', 
        require: true,
    }

});

module.exports = mongoose.model("predio", Predio);