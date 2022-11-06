const mongoose = require("mongoose");
mongoose.connect(process.env.URI);
// opcional
mongoose.connection.once('open', () => {
    console.log('Conexão estabelecida com o mongodb.');
}).on('error', function (error) {
    console.log('Erro na conexão com o mongodb:', error);
});