const Usuario = require('../model/UsuarioSchema');

module.exports = (app) => {
    app.get('/usuario-srv', (req, res) => {
        Usuario.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).sort({ nome: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/usuario-srv', (req, res, next) => {
        let obj = new Usuario(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/usuario-srv', (req, res) => {
        let obj = new Usuario(req.body);
        const error = obj.validateSync();
        if (error) {
            res.status(400).send(error.message);
            return;
        };
        Usuario.updateOne({ _id: obj._id }, obj, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.delete('/usuario-srv/:id', (req, res) => {
        Usuario.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/usuario-srv/:id', (req, res) => {
        Usuario.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.get('/usuario-srv/filtro/:filtro', (req, res) => {
        Usuario.find({
            $or: [
                { nome: { $regex: req.params.filtro, $options: "i" } },
                { email: { $regex: req.params.filtro, $options: "i" } },
            ],
        }, (err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        })
    });
};