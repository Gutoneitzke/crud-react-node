const Predio = require('../model/PredioSchema');

module.exports = (app) => {
    app.get('/Predio', (req, res) => {
        Predio.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).populate('rua').sort({ nome: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/Predio', (req, res, next) => {
        let obj = new Predio(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/Predio', (req, res) => {
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

    app.delete('/Predio/:id', (req, res) => {
        Predio.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/Predio/:id', (req, res) => {
        Predio.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        }).populate('rua');
    });

    app.get('/Predio/filtro/:filtro', (req, res) => {
        Predio.find({
            $or: [
                { nome: { $regex: req.params.filtro, $options: "i" } },
                { sigla: { $regex: req.params.filtro, $options: "i" } },
            ],
        }, function (err) {
            if (err)
                res.status(400).send(err.message);
            res.json(objetos);
        }).sort({ nome: -1 }); // -1 decrescente 1 crescente
    });
};

