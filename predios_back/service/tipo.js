const ObjectId = require('mongodb').ObjectId;
module.exports = (app) => {
    app.get('/tipo', (req, res) => {
        db.collection('tipo').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
    app.post('/tipo', (req, res, next) => {
        db.collection('tipo').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });
    app.put('/tipo', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                descricao: req.body.descricao
            }
        };
        db.collection('tipo').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });
    app.delete('/tipo/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('tipo').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });
    app.get('/tipo/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
    app.get('/tipo/filtro/:valor', (req, res) => {
        db.collection('tipo').find({
            $or: [
                { descricao: { $regex: req.params.valor, $options: "i" } }
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
};

