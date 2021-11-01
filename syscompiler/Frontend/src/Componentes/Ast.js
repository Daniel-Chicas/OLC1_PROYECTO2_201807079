import {React, useState} from 'react'
import axios from 'axios';

function Ast() {
    var data = "";
    hacerAST()
    async function hacerAST(){
        var actual = localStorage.getItem('actual')
        var lastChar = actual[actual.length -1];
        lastChar = parseInt(lastChar)
        var datosPes = localStorage.getItem('datosPes')
        var datosP = JSON.parse(datosPes);
        var entrada = datosP[lastChar];
        await axios.post("http://localhost:5000/ast", {
            entrada
        })
        .then(response=>{
            data = response.data.message
        })
        
    }

    return (
        <div>
           ast
        </div>
    )
}


export default Ast
