const Predio = require('../model/PredioSchema');

module.exports = (app) => {
    app.get('/predio-srv', (req, res) => {
        Predio.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).populate('rua').sort({ nome: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/predio-srv', (req, res, next) => {
        let obj = new Predio(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/predio-srv', (req, res) => {
        let obj = new Predio(req.body);
        const error = obj.validateSync();
        if (error) {
            res.status(400).send(error.message);
            return;
        };
        Predio.updateOne({ _id: obj._id }, obj, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.delete('/predio-srv/:id', (req, res) => {
        Predio.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/predio-srv/:id', (req, res) => {
        Predio.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        }).populate('rua');
    });

    app.get('/predio-srv/filtro/:filtro', (req, res) => {
        Predio.find({
            $or: [
                { nome: { $regex: req.params.filtro, $options: "i" } },
                { sigla: { $regex: req.params.filtro, $options: "i" } },
            ],
        }, (err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        })
    });
};

