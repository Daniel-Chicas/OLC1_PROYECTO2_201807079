import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import '../Estilos/Editor.css'

function Editor(props) {
    const{
        language
    } = props

    var datosPes = localStorage.getItem('datosPes')
    var datos = JSON.parse(datosPes);
    var lastChar = props.id[props.id.length -1];
    lastChar = parseInt(lastChar)
    const [value, setValue] = React.useState(datos[lastChar]);

    function handleChange(editor, data, value){
        setValue(value)
    }

    const cambia = (id)=>{
        localStorage.setItem('actual', id)
        var lastChar = id[id.length -1];
        lastChar = parseInt(lastChar)
        var datosPes = localStorage.getItem('datosPes')
        var datos = JSON.parse(datosPes);
        datos[lastChar] = value
        localStorage.setItem('datosPes', JSON.stringify(datos))
    }

    return (
        <div className="editor-container">
            <ControlledEditor
                onBeforeChange = {handleChange}
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

export default Editor
