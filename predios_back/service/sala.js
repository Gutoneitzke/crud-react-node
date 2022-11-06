const ObjectId = require('mongodb').ObjectId;
module.exports = (app) => {
    app.get('/sala', (req, res) => {
        db.collection('sala').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
    app.post('/sala', (req, res, next) => {
        db.collection('sala').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });
    app.put('/sala', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                descricao: req.body.descricao,
                capacidade: req.body.capacidade,
                andares: req.body.andares,
                localizacao: req.body.localizacao
            }
        };
        db.collection('sala').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });
    app.delete('/sala/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('sala').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });
    app.get('/sala/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
    app.get('/sala/filtro/:valor', (req, res) => {
        db.collection('sala').find({
            $or: [
                { descricao: { $regex: req.params.valor, $options: "i" } }
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
};

