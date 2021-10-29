import React from 'react';
import axios from 'axios';
import ast from '../Archivospdf/ast.pdf'

function Ast() {
    hacerAST();
    async function hacerAST(e){
        console.log("haciendo ast")
        var actual = localStorage.getItem('actual')
        var lastChar = actual[actual.length -1];
        lastChar = parseInt(lastChar)
        var datosPes = localStorage.getItem('datosPes')
        var datosP = JSON.parse(datosPes);
        var entrada = datosP[lastChar];
        try{
            await axios.post("http://localhost:5000/ast", {
                entrada
            })
            .then(response=>{
                console.log(response.data.message)
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <embed src={ast} type='application/pdf' width="100%" height="100%"/>
        </div>
    )
}


export default Ast
