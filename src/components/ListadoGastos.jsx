import { useState } from "react";
import Gasto from "./Gasto"

const ListadoGastos = ({ listaGastos, setEditarGasto, eliminarGasto, filtroCategoria }) => {

    return (
        <div className="listado-gastos contenedor">
            <h2>{filtroCategoria ?
                'Gastos filtrados' :
                listaGastos.length ?
                    'Gastos Registrados' : 'Aun no ha registrado gastos'}</h2>

            {listaGastos.map(gasto =>
                !filtroCategoria ||
                    filtroCategoria === gasto.categoria ? (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setEditarGasto={setEditarGasto}
                        eliminarGasto={eliminarGasto} />
                ) : ''
            )}
        </div>
    )
}

export default ListadoGastos
