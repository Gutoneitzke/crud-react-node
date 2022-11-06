const Rua = require('../model/RuaSchema');

module.exports = (app) => {
    app.get('/rua-srv', (req, res) => {
        Rua.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).sort({ descricao: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/rua-srv', (req, res, next) => {
        let obj = new Rua(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/rua-srv', (req, res) => {
        let obj = new Rua(req.body);
        const error = obj.validateSync();
        if (error) {
            res.status(400).send(error.message);
            return;
        };
        Rua.updateOne({ _id: obj._id }, obj, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.delete('/rua-srv/:id', (req, res) => {
        Rua.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/rua-srv/:id', (req, res) => {
        Rua.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.get('/rua-srv/filtro/:filtro', (req, res) => {
        Predio.find({
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

