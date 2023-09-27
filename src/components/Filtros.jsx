import { useEffect, useState } from 'react'

const Filtros = ({ filtroCategoria, setFiltroCategoria }) => {

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar categoria de gastos</label>
                    <select
                        value={filtroCategoria}
                        onChange={e => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">-- Todos --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="varios">Gastos varios</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros
