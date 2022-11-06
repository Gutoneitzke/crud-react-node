import { useState } from 'react';
import './App.css';
import Menu from './Menu';
import Salas from './Salas';
import Predios from './Predios';
import Ruas from './Ruas';
import Tipos from './Tipos';

function App() {
  const [option, setOpcao] = useState('predios')

  if(option == 'predios')
  {
    return (
      <div>
        <Menu setOpcao={setOpcao}/>
        <Predios />
      </div>
    );
  }
  else if(option == 'salas')
  {
    return (
      <div >
        <Menu setOpcao={setOpcao}/>
        <Salas />
      </div>
    );
  }
  else if(option == 'ruas')
  {
    return (
      <div >
        <Menu setOpcao={setOpcao}/>
        <Ruas />
      </div>
    );
  }
  else
  {
    return (
      <div >
        <Menu setOpcao={setOpcao}/>
        <Tipos />
      </div>
    );
  }
}

export default App
