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

// conexão com mongoBD
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.URI;
MongoClient.connect(uri, (err, client) => {
    if (err)
        return console.log(err);
    db = client.db(process.env.BASE_NAME);
    app.listen(process.env.PORT, function () {
        console.log('API rodando na porta -> '+process.env.PORT);
        console.log('Testar por http://localhost:'+process.env.PORT);
    });
});

const endpoints = require('./endpoints');
endpoints(app);