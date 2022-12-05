import React, { useState } from 'react';
export default function UsuarioList(props) {
       return (
        <div>
            <h4>Listagem de usuários </h4>
            <button onClick={props.onClickAtualizar} type="button" 
                   class="btn btn-primary btn-sm">Atualizar Lista</button>

            <button type="button" class="btn btn-primary btn-sm"
                    onClick={props.inserir}>Inserir</button> 

            <table className='table'>
                <thead>
                    <tr>
                    <th>Index</th><th>Id</th><th>Nome</th><th>Email</th><th>Celular</th><th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usuarios.length > 0 ? (props.usuarios.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{o._id}</td>
                            <td>{o.nome}</td>
                            <td>{o.email}</td>
                            <td>{o.celular}</td>
                            <td>
                                <button class="btn btn-primary btn-sm"
                                   onClick={() => props.editar(o._id)}
                                >Editar</button>
                                <button class="btn btn-danger btn-sm"
                                   onClick={() => props.excluir(o._id)}
                                >Excluir</button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={6}>Nenhum usuário.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}