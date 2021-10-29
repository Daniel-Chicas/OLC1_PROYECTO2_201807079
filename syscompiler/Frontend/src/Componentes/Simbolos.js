import {React,  useState} from 'react'
import axios from 'axios';
import Tabla from './Tabla';
import '../Estilos/App.css'

function Simbolos() {
    const [Data, setData] = useState([])
    const encabezado=['ID', 'DATO', 'TIPO', 'ENTORNO', 'LINEA', 'COLUMNA']
    var id= "";
    var Dato= "";
    var Tipo = "";
    var Entorno = "";
    var Linea = "";
    var Columna = "";
    var aux = [];

    tablaSimbolos()

    async function tablaSimbolos(e){
        console.log("obteniendo tablaSimbolos")
        var actual = localStorage.getItem('actual')
        var lastChar = actual[actual.length -1];
        lastChar = parseInt(lastChar)
        var datosPes = localStorage.getItem('datosPes')
        var datosP = JSON.parse(datosPes);
        var entrada = datosP[lastChar];
        try{
            await axios.post("http://localhost:5000/simbolos", {entrada})
            .then(response=>{
                for (let i = 0; i < response.data.message.length; i++) {
                    const element = response.data.message[i];
                    var cadena = element.split("&")
                    id = cadena[0]
                    Dato= cadena[1]
                    Tipo = cadena[2]
                    Entorno = cadena[3]
                    Linea = cadena[4]
                    Columna = cadena[5]
                    var json={
                        id,
                        Dato,
                        Tipo,
                        Entorno,
                        Linea,
                        Columna
                    }
                    aux.push(json)
                }
                setData(aux)
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="GeneralLogin">
            <Tabla
                encabezados={encabezado}
                data = {Data}
            />
        </div>
    )
}

export default Simbolos
