import React from 'react'

function Fila(props) {
    return (
        <>
            <tr key={props.index}>
                <td>{props.mensaje}</td>
                <td>{props.tipo}</td>
                <td>{props.linea}</td>
                <td>{props.columna}</td>
            </tr>
        </>
    )
}

export default Fila
