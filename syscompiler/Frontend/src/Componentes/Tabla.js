import React from 'react'
import Fila from './Fila'
import { Table } from 'semantic-ui-react'

function Tabla(props) {    
    return (
        <div>
            <div className="Tabla">
            <div className="ui segment container ">
                <Table celled inverted selectable>
                    <thead>
                        <tr>
                            {props.encabezados.map((dato) => (
                                <th>{dato}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((dato, index) => (
                            <Fila
                                index={index}
                                id={dato.id}
                                Dato={dato.Dato}
                                Tipo = {dato.Tipo}
                                Entorno = {dato.Entorno}
                                Linea = {dato.Linea}
                                Columna = {dato.Columna}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
        </div>
    )
}

export default Tabla
