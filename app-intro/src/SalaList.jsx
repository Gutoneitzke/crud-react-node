// import React, { useState } from 'react';
export default function SalaList(props) {
    return (
        <div>
            <h4>Listagem de Salas </h4>
            <button onClick={props.onClickAtualizar} type="button"
                class="btn btn-primary btn-sm">Atualizar Lista</button>
            <button type="button" class="btn btn-primary btn-sm"
                onClick={props.inserir}>Inserir</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Index</th><th>Id</th><th>Descricao</th><th>Capacidade</th><th>Andar</th><th>Localizacao</th><th>Predio</th><th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {props.salas.length > 0 ? (props.salas.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{o._id}</td>
                            <td>{o.descricao}</td>
                            <td>{o.capacidade}</td>
                            <td>{o.andar}</td>
                            <td>{o.localizacao}</td>
                            <td>{o.predio.nome}</td>
                            <td>{o.tipo.descricao}</td>
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
                            <td colSpan={6}>Nenhum usuário..</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}