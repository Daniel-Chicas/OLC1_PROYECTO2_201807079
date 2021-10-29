import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './Componentes/App'
import Errores from './Componentes/Errores'
import Ast from './Componentes/Ast'
import Simbolos from './Componentes/Simbolos'

function General() {
    
    //window.location.href = "http://localhost:3000/App";
  return (
  <>
      <Router>
        <Route path="/App" component={App} />
        <Route path="/Errores" component={Errores}/>
        <Route path="/AST" component={Ast}/>
        <Route path="/Simbolos" component={Simbolos}/>
      </Router>
   </>
  )
}

export default General;
