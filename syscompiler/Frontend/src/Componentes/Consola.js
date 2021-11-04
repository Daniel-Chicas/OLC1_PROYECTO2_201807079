import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import '../Estilos/Editor.css'

function Consola(props) {
    const{
        language
    } = props

    var datosPes = localStorage.getItem('consola')
    var datos = JSON.parse(datosPes);
    const [value] = React.useState(datos[0]);

    //function handleChange(editor, data, value){
    //    setValue(value)
    //}

    const cambia = ()=>{
        var datosPes = localStorage.getItem('consola')
        var datos = JSON.parse(datosPes);
        localStorage.setItem('consola', JSON.stringify(datos))
    }

    return (
        <div className="editor-container">
            <ControlledEditor
                //onBeforeChange = {handleChange}
                value = {value}
                className = "code-mirror-wrapper"
                onChange = {cambia(props.id)}
                options={{
                    lineWrapping: true,
                    lint : true,
                    mode: language,
                    theme : 'material',
                    lineNumbers : true
                }}
            />
        </div>
    )
}

export default Consola
