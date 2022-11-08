import React, { useState } from 'react';
import axios from './services/axios-common';

export default function Predios(){
    const [predios, setPredios] = useState([]);
    const [template, setTemplate] = useState(1);
    const [showspinner, setSpinner] = useState(true);

    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [andares, setAndares] = useState('');
    const [rua, setRua] = useState('');
    const [id, setId] = useState('');

    React.useEffect(() => {
        refreshData()
        }, []);

    function refreshData(){
        axios
            .get('/predio-srv')
            .then((response) => {
                setPredios(response.data)
                setSpinner(false);
            });
    }

    function showEditPage(data){
        setTemplate(3);
        setNome(data.nome);
        setSigla(data.sigla);
        setAndares(data.andares);
        setRua(!data.rua ? '' : data.rua._id);
        setId(data._id);
    }

    function submit(event){
        event.preventDefault();
        setSpinner(true);

        let data = {
            nome: nome,
            sigla: sigla,
            andares: andares,
            rua: rua
        };

        axios
            .post('/predio-srv',data)
            .then((response) => {
                setSpinner(false);
                setTemplate(1);
                refreshData();
            });
    }

    function submitUpdate(event){
        event.preventDefault();
        setSpinner(true);

        let data = {
            nome: nome,
            sigla: sigla,
            andares: andares,
            rua: rua
        };

        axios
            .put('/predio-srv?_id='+id,data)
            .then((response) => {
                setSpinner(false);
                setTemplate(1);
                refreshData();
            });
    }

    function deleteData(data){
        if(confirm('Tem certeza que deseja deletar ?'))
        {
            setSpinner(true);
            
            axios.delete('/predio-srv/'+data)
                .then((response) => {
                    setSpinner(false);
                    setTemplate(1);
                    refreshData();
                });
        }
    }

    function newRegister(){
        setTemplate(2)
        setNome('');
        setSigla('');
        setAndares('');
        setRua('');
        setId('');
    }

    return (
        <div className="project">
            <h4>Listagem de prédios</h4>
            { showspinner ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
            <div>
                { template == 1 ? (
                    <div className="text-center">
                        <button className="btn btn-success mb-5" onClick={() => { newRegister() }}>Novo</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Sigla</th>
                                    <th>Andares</th>
                                    <th>Rua</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predios.length > 0 ? (predios.map((u,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{u.nome}</td>
                                        <td>{u.sigla}</td>
                                        <td>{u.andares}</td>
                                        <td>{!u.rua ? '-' : u.rua['descricao']}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => { showEditPage(u) }}>Editar</button>
                                            <button className="btn btn-danger" onClick={() => { deleteData(u._id) }}>Deletar</button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td>Nenhum registro</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : template == 2 ? (
                    <div className="text-center">
                        <button className="btn btn-primary mb-5" onClick={() => { setTemplate(1) }}>Voltar</button>
                        <form onSubmit={(e) => { submit(e) }}>
                            <div className="form-group text-left">
                                <label for="nome">Nome</label>
                                <input type="text" className="form-control" id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="sigla">Sigla</label>
                                <input type="text" className="form-control" id="sigla" placeholder="Sigla" value={sigla} onChange={(e) => setSigla(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="andares">Andares</label>
                                <input type="number" className="form-control" id="andares" placeholder="Andares" value={andares} onChange={(e) => setAndares(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="rua">Rua</label>
                                <input type="text" className="form-control" id="rua" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn mt-3 btn-success">Enviar</button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center">
                        <button className="btn btn-primary mb-5" onClick={() => { setTemplate(1) }}>Voltar</button>
                        <form onSubmit={(e) => { submitUpdate(e) }}>
                            <div className="form-group text-left">
                                <label for="nome">Nome</label>
                                <input type="text" className="form-control" id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="sigla">Sigla</label>
                                <input type="text" className="form-control" id="sigla" placeholder="Sigla" value={sigla} onChange={(e) => setSigla(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="andares">Andares</label>
                                <input type="number" className="form-control" id="andares" placeholder="Andares" value={andares} onChange={(e) => setAndares(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="rua">Rua</label>
                                <input type="text" className="form-control" id="rua" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn mt-3 btn-success">Enviar</button>
                        </form>
                    </div>
                )}
            </div>
            ) }
        </div>
    );

} 