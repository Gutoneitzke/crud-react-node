const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

console.log("Projeto Rodando!!!");

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('Atendida a requisição GET!!');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('API rodando na porta '+port);
    console.log(`Testar por http://localhost:${port}`);
});

// conexão com mongoBD
require('./mongo');
const { default: mongoose } = require("mongoose");

const predio = require('./service/predio');
predio(app);

const PredioSrv = require('./service/PredioSrv');
PredioSrv(app);

const rua = require('./service/rua');
rua(app);

const RuaSrv = require('./service/RuaSrv');
RuaSrv(app);

const sala = require('./service/sala');
sala(app);

const SalaSrv = require('./service/SalaSrv');
SalaSrv(app);

const tipo = require('./service/tipo');
tipo(app);

const TipoSrv = require('./service/TipoSrv');
TipoSrv(app);

const UsuarioSrv = require('./service/UsuarioSrv');
UsuarioSrv(app);