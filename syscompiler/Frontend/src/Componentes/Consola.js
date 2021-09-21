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
        language,
        value,
        onChange
    } = props

    function handleChange(editor, data, value){
        onChange(value)
    }

    return (
        <div className="editor-container">
            <ControlledEditor
                onBeforeChange = {handleChange}
                value = {value}
                className = "code-mirror-wrapper"

                options={{
                    lineWrapping: true,
                    lint : true,
                    mode: language,
                    theme : 'material',
                    lineNumbers : true,
                    readOnly: true
                }}
            />
        </div>
    )
}

export default Consola
