import React, { useState } from 'react';
import axios from './services/axios-common';

export default function Ruas(){
    const [ruas, setRuas] = useState([]);
    const [showspinner, setSpinner] = useState(true);

    React.useEffect(() => {
        axios.get('/rua').then((response) => {
            setRuas(response.data);
            setSpinner(false);
        });
    }, []);

    return (
        <div class="project">
            <h4>Listagem de Ruas</h4>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ruas.length > 0 ? (ruas.map((u,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{u.descricao}</td>
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
            ) }
        </div>
    );

} 