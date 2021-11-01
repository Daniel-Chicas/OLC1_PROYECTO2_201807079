import React from 'react'
import Fila from './FilaErrores'
import { Table } from 'semantic-ui-react'

function TablaErrores(props) {    
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
                                mensaje={dato.mensaje}
                                tipo={dato.tipo}
                                linea = {dato.linea}
                                columna = {dato.columna}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
        </div>
    )
}

export default TablaErrores
