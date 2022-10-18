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
            .get('/predio')
            .then((response) => {
                setPredios(response.data);
                setSpinner(false);
            });
    }

    function showEditPage(data){
        setTemplate(3);
        setNome(data.nome);
        setSigla(data.sigla);
        setAndares(data.andares);
        setRua(data.rua);
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
            .post('/predio',data)
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
            .put('/predio?_id='+id,data)
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
            
            axios.delete('/predio/'+data)
                .then((response) => {
                    setSpinner(false);
                    setTemplate(1);
                    refreshData();
                });
        }
    }

    return (
        <div class="project">
            <h4>Listagem de prédios</h4>
            { showspinner ? (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
            <div>
                { template == 1 ? (
                    <div class="text-center">
                        <button class="btn btn-success mb-5" onClick={() => { setTemplate(2) }}>Novo</button>
                        <table class="table">
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
                                        <td>{u.rua}</td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() => { showEditPage(u) }}>Editar</button>
                                            <button class="btn btn-danger" onClick={() => { deleteData(u._id) }}>Deletar</button>
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
                    <div class="text-center">
                        <button class="btn btn-primary mb-5" onClick={() => { setTemplate(1) }}>Voltar</button>
                        <form onSubmit={(e) => { submit(e) }}>
                            <div class="form-group text-left">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="sigla">Sigla</label>
                                <input type="text" class="form-control" id="sigla" placeholder="Sigla" value={sigla} onChange={(e) => setSigla(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="andares">Andares</label>
                                <input type="number" class="form-control" id="andares" placeholder="Andares" value={andares} onChange={(e) => setAndares(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="rua">Rua</label>
                                <input type="text" class="form-control" id="rua" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                            </div>
                            <button type="submit" class="btn mt-3 btn-success">Enviar</button>
                        </form>
                    </div>
                ) : (
                    <div class="text-center">
                        <button class="btn btn-primary mb-5" onClick={() => { setTemplate(1) }}>Voltar</button>
                        <form onSubmit={(e) => { submitUpdate(e) }}>
                            <div class="form-group text-left">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="sigla">Sigla</label>
                                <input type="text" class="form-control" id="sigla" placeholder="Sigla" value={sigla} onChange={(e) => setSigla(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="andares">Andares</label>
                                <input type="number" class="form-control" id="andares" placeholder="Andares" value={andares} onChange={(e) => setAndares(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="rua">Rua</label>
                                <input type="text" class="form-control" id="rua" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                            </div>
                            <button type="submit" class="btn mt-3 btn-success">Enviar</button>
                        </form>
                    </div>
                )}
            </div>
            ) }
        </div>
    );

} 