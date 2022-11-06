const Sala = require('../model/SalaSchema');

module.exports = (app) => {
    app.get('/sala-srv', (req, res) => {
        Sala.find((err, objetos) => {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(objetos);
        }).sort({ descricao: 1 }); // -1 decrescente  1 crescente
    });

    app.post('/sala-srv', (req, res, next) => {
        let obj = new Sala(req.body);
        obj.save((err, obj) => {
            if (err) res.status(400).send(err.message);
            res.status(200).json(obj);
        });
    });

    app.put('/sala-srv', (req, res) => {
        let obj = new Sala(req.body);
        const error = obj.validateSync();
        if (error) {
            res.status(400).send(error.message);
            return;
        };
        Sala.updateOne({ _id: obj._id }, obj, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.delete('/sala-srv/:id', (req, res) => {
        Sala.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json("{message:'ok'}");
        });

    });

    app.get('/sala-srv/:id', (req, res) => {
        Sala.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                res.status(400).send(err.message);
            };
            res.status(200).json(obj);
        });
    });

    app.get('/sala-srv/filtro/:filtro', (req, res) => {
        Sala.find({
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

