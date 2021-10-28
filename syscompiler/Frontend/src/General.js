import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './componentes/App'
import Errores from './componentes/Errores'
import Ast from './componentes/Ast'
import Simbolos from './componentes/Simbolos'
import './App.css'

function App() {
  return (
  <>
      <Router>
        <Route path="/App" component={CargaArchivosjson} />
        <Route path="/Errores" component={Productos}/>
        <Route path="/AST" component={ListadoTiendas}/>
        <Route path="/Simbolos" component={Productos}/>
      </Router>
   </>
  )
}

export default App;
