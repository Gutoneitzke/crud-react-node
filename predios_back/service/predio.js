const ObjectId = require('mongodb').ObjectId;
module.exports = (app) => {
    app.get('/predio', (req, res) => {
        db.collection('predio').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
    app.post('/predio', (req, res, next) => {
        db.collection('predio').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });
    app.put('/predio', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                sigla: req.body.sigla,
                andares: req.body.andares
            }
        };
        db.collection('predio').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });
    app.delete('/predio/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('predio').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });
    app.get('/predio/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
    app.get('/predio/filtro/:valor', (req, res) => {
        db.collection('predio').find({
            $or: [
                { nome: { $regex: req.params.valor, $options: "i" } }
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
};

