import React, { useState } from 'react';

export default function Menu(props) {

    return (
        <div>
            <nav class="p-3 navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Gustavo Neitzke - UPF</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <button class="nav-link bg-white" onClick={() => { props.setOpcao('predios') }}>Predios</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link bg-white" onClick={() => { props.setOpcao('ruas') }}>Ruas</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link bg-white" onClick={() => { props.setOpcao('salas') }}>Salas</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link bg-white" onClick={() => { props.setOpcao('tipos') }}>Tipos</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );

}