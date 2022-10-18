import React, { useState } from 'react';
import axios from './services/axios-common';

export default function Tipos(){
    const [tipos, setTipos] = useState([]);
    const [showspinner, setSpinner] = useState(true);

    React.useEffect(() => {
        axios.get('/tipo').then((response) => {
            setTipos(response.data);
            setSpinner(false);
        });
    }, []);

    return (
        <div class="project">
            <h4>Listagem de Tipos</h4>
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
                            {tipos.length > 0 ? (tipos.map((u,index) => (
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
            )}
        </div>
    );

} 