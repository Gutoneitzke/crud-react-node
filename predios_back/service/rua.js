const ObjectId = require('mongodb').ObjectId;
module.exports = (app) => {
    app.get('/rua', (req, res) => {
        db.collection('rua').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
    app.post('/rua', (req, res, next) => {
        db.collection('rua').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });
    app.put('/rua', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                descricao: req.body.descricao
            }
        };
        db.collection('rua').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });
    app.delete('/rua/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('rua').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });
    app.get('/rua/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
    app.get('/rua/filtro/:valor', (req, res) => {
        db.collection('rua').find({
            $or: [
                { descricao: { $regex: req.params.valor, $options: "i" } }
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
};

