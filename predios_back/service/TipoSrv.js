const Tipo = require('../model/TipoSchema');

module.exports = (app) => {
    app.get('/tipo-srv', (req, res) => {
        Tipo.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).sort({ descricao: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/tipo-srv', (req, res, next) => {
        let obj = new Tipo(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/tipo-srv', (req, res) => {
        let obj = new Tipo(req.body);
        const error = obj.validateSync();
        if (error) {
            res.status(400).send(error.message);
            return;
        };
        Tipo.updateOne({ _id: obj._id }, obj, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.delete('/tipo-srv/:id', (req, res) => {
        Tipo.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/tipo-srv/:id', (req, res) => {
        Tipo.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.get('/tipo-srv/filtro/:filtro', (req, res) => {
        Tipo.find({
            $or: [
                { descricao: { $regex: req.params.filtro, $options: "i" } },
            ],
        }, (err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        })
    });
};

