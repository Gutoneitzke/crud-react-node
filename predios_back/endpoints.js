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
                descricao: req.body.descricao,
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
        db.collection('rua').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/predio', (req, res) => {
        db.collection('predio').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });

    app.post('/predio', (req, res, next) => {
        var item = {
            nome: req.body.nome,
            sigla: req.body.sigla,
            andares: req.body.andares,
            rua: req.body.rua
        };
        db.collection('predio').insertOne(item, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    app.put('/predio', (req, res) => {
        var id = ObjectId(req.query._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                sigla: req.body.sigla,
                andares: req.body.andares,
                rua: req.body.rua
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
        db.collection('predio').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/predio/rua/:rua', (req, res) => {
        db.collection('predio').find({
            $or: [
                { rua: { $regex: req.params.rua, $options: "i" } },
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });


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
                andar: req.body.andar,
                localizacao: req.body.localizacao,
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
        db.collection('sala').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/sala/predio/:predio', (req, res) => {
        db.collection('sala').find({
            $or: [
                { predio: { $regex: req.params.predio, $options: "i" } },
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });


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
                descricao: req.body.descricao,
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
        db.collection('tipo').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
}
