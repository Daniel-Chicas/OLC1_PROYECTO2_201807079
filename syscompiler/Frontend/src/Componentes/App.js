import {React, useState} from 'react'
import '../Estilos/App.css'
import NavBarInicio from './NavBar.js'
import { Button, Label } from 'semantic-ui-react'
import Entrada from '../Componentes/Entrada.js'
import Salida from '../Componentes/Salida.js'

//yylloc.first_line, yylloc.first_column
function App() {
  localStorage.setItem('actual', "")
  const [listado, setlistado] = useState([])
  var datos = localStorage.getItem('pestanias')
  var datosPes = localStorage.getItem('datosPes')

  var json=""

  if (datos === null || datos === undefined) {
    localStorage.setItem('pestanias', 1)
    localStorage.setItem('datosPes', JSON.stringify([json]))
  }

  const agregar = () =>{
          datos = localStorage.getItem('pestanias')
          datosPes = localStorage.getItem('datosPes')
          datos = JSON.parse(datos);
          var x = datos+1;
          localStorage.setItem('pestanias', x)
          var datosP = JSON.parse(datosPes)
          datosP.push("")
          localStorage.setItem('datosPes', JSON.stringify(datosP))
          setlistado(datosP)
  }

  const eliminar = () =>{
    datos = localStorage.getItem('pestanias')
    datos = JSON.parse(datos);
    var x = datos-1;
    localStorage.setItem('pestanias', x)


    var actual = localStorage.getItem('actual')
    var lastChar = actual[actual.length -1];
    lastChar = parseInt(lastChar)
    const nuevaLista = listado.filter((data, index) => index !== lastChar)

    var datosPes = localStorage.getItem('datosPes')
    var datosP = JSON.parse(datosPes);
    datosP[lastChar] = ""
    var nuevodatosP = datosP.filter((data, index) => index !== lastChar)
    localStorage.setItem('datosPes', JSON.stringify(nuevodatosP))
    window.location.reload();
  }

  return (
    <div className="GeneralLogin">
      <NavBarInicio/>
      <div className="Entrada">
          <Label size={'Huge'} color={"blue"}>Entradas</Label>
          <Button color='green' id="AgregarP" onClick={agregar}>Agregar</Button>
          <Button color='red'  id="EliminarP" onClick={eliminar}>Eliminar</Button>
          <Entrada 
                  Cantidad={datos}
                  Texto={listado}
          />
      </div>
      <div className="Salida">
          <Label size={'Huge'} color={"blue"}>Consola</Label>
          <Salida 
                  Cantidad={datos}
                  Texto={listado}
          />
      </div>
    </div>
  );
}

export default App

