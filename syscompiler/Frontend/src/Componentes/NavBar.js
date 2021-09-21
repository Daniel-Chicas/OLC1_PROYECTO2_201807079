import {React, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import '../Estilos/Nav.css'
import {saveAs} from 'file-saver'
//window.location.reload();

var realizado = false
const colores=[ 'green', 'yellow', 'orange', 'teal', 'violet']
const opciones =[ 'Guardar Archivo', 'Ejecutar', 'Reporte de Errores', 'Árbol AST', 'Reporte de Símbolos']



function NavBarIncio() {

    const leerArchivo = (e) =>{
        const file = e.target.files[0];
        if(!file) return;
        const fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = () =>{
            var actual = localStorage.getItem('actual')
            var lastChar = actual[actual.length -1];
            lastChar = parseInt(lastChar)
            console.log(lastChar)
            var datosPes = localStorage.getItem('datosPes')
            var datosP = JSON.parse(datosPes);
            datosP[lastChar] = fileReader.result;
            localStorage.setItem('datosPes', JSON.stringify(datosP))
            window.location.reload()
        }

        fileReader.onerror = () => {
            console.log( fileReader.error )
        }

    }

    const [activo, setactivo] = useState(colores[6])
    if (activo === "green"){
        if(!realizado){
            var actual = localStorage.getItem('actual')
            var lastChar = actual[actual.length -1];
            lastChar = parseInt(lastChar)
            var datosPes = localStorage.getItem('datosPes')
            var datosP = JSON.parse(datosPes);
            const blob = new Blob([datosP[lastChar]], {type: 'text/plain;charset=utf-8'})
            saveAs(blob, 'Pestaña'+lastChar+".txt")
            realizado = true
        }
        window.location.reload()
    }else if (activo === "yellow"){
        localStorage.setItem('consola', JSON.stringify(["falta la consola, \nReporte de errores, \nárbol ast y \nReporte de símbolos"]))
        window.location.reload()
    }else if (activo === "orange"){
        window.location.reload()
    }else if (activo === "teal"){
        window.location.reload()
    }else if (activo === "violet"){
        window.location.reload()
    }
    return (
       <Menu inverted className="Nav" >
           
           <Menu.Item 
                key={"light blue"}
                name={"Cargar Archivo"}
                active={activo==='light blue'}
                color={'light blue'}
            >   
                <label for="selectedFile" id="etiqueta">Cargar Archivo</label>
                <input type="file" id="selectedFile" style={{display:"none"}} onChange={ leerArchivo } multiple="false"/>
            </Menu.Item>

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
