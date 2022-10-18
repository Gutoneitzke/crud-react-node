import React, { useState } from 'react';
import axios from './services/axios-common';

export default function Salas(){
    const [salas, setSalas] = useState([]);
    const [showspinner, setSpinner] = useState(true);

    React.useEffect(() => {
        axios.get('/sala').then((response) => {
            setSalas(response.data);
            setSpinner(false);
        });
    }, []);

    return (
        <div class="project">
            <h4>Listagem de Salas</h4>
            { showspinner ? (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div class="text-center">
                <button class="btn btn-success mb-5">Novo</button>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descrição</th>
                                <th>Capacidade</th>
                                <th>Andares</th>
                                <th>Localização</th>
                                <th>Prédio</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salas.length > 0 ? (salas.map((u,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{u.descricao}</td>
                                    <td>{u.capacidade}</td>
                                    <td>{u.andar}</td>
                                    <td>{u.localizacao}</td>
                                    <td>{u.predio}</td>
                                    <td>
                                        <button class="btn btn-primary">Editar</button>
                                        <button class="btn btn-danger">Deletar</button>
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
            )}
        </div>
    );

} 