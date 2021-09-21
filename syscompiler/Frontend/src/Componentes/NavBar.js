import {React, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import '../Estilos/Nav.css'

const colores=['light blue', 'green', 'yellow', 'orange', 'teal', 'violet']
const opciones =[ 'Cargar Archivo', 'Guardar Archivo', 'Ejecutar', 'Reporte de Errores', 'Árbol AST', 'Reporte de Símbolos', '']

function NavBarIncio() {
    const [activo, setactivo] = useState(colores[9])
    return (
       <Menu inverted className="Nav" >
           {colores.map((c,iterador)=>(
               <Menu.Item 
                    key={c}
                    name={opciones[iterador]}
                    active={activo===c}
                    color={c}
                    onClick={()=>setactivo(c)}
               />
           ))}
       </Menu>
    )
}

export default NavBarIncio
