import React, { lazy, Suspense, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Example = lazy(() => import('./Example' ));
const Predio = lazy(() => import('./Predio' ));
const Tipo = lazy(() => import('./Tipo' ));
const Sala = lazy(() => import('./Sala' ));
const Rua = lazy(() => import('./Rua' ));


function App() {
  return (
    <BrowserRouter >
      <Menu/>  
      <Suspense fallback={<div>Carregando ... </div>}>
        <Routes>
          <Route path="/rua" element={<Rua />} />
          <Route path="/tipo" element={<Tipo />} />
          <Route path="/predio" element={<Predio />} />
          <Route path="/sala" element={<Sala />} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
}

export default App;
