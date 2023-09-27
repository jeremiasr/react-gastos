import cerrarBtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Fallos from './Fallos'


const NuevoGasto = ({
    setModal,
    animarModal,
    setAnimarModal,
    listaGastos,
    setListaGastos,
    gastado,
    setGastado,
    disponible,
    setDisponible,
    editarGasto,
    setEditarGasto
}) => {
    const [nombre, setNombre] = useState('')
    const [monto, setMonto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [esEditando, setEsEditando] = useState(false)

    const generarId = () => {
        const ramdon = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return ramdon + fecha
    }

    const objetoNuevoGasto = {
        nombre, monto, categoria, descripcion
    }

    useEffect(() => {
        if (Object.keys(editarGasto).length > 0) {
            setNombre(editarGasto.nombre);
            setMonto(editarGasto.monto);
            setCategoria(editarGasto.categoria);
            setDescripcion(editarGasto.descripcion);
            setEsEditando(true)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setEditarGasto({})
        setTimeout(() => {
            setModal(false)
        }, 400);
    }

    const registrarGasto = (e) => {
        e.preventDefault();

        if ([nombre, monto, categoria].includes('')) {
            setMensaje('El gasto, monto y categoria, son obligatorios')
            return
        }

        if (esEditando) {
            objetoNuevoGasto.id = editarGasto.id
            objetoNuevoGasto.fecha = editarGasto.fecha
            setGastado(gastado + (objetoNuevoGasto.monto-editarGasto.monto))
            setDisponible(disponible - (objetoNuevoGasto.monto-editarGasto.monto))
            //
            const listaGastosActualizada = listaGastos.map(
                gastoState => gastoState.id === editarGasto.id ? objetoNuevoGasto : gastoState
            )
            setListaGastos(listaGastosActualizada)
            setEditarGasto({})
        } else {
            objetoNuevoGasto.id = generarId()
            objetoNuevoGasto.fecha = Date.now();
            setGastado(gastado + monto)
            setDisponible(disponible - monto)
            setListaGastos([...listaGastos, objetoNuevoGasto])
        }

        setModal(false)
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={cerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={registrarGasto}
            >
                <legend>Nuevo Gasto</legend>

                {mensaje.length !== 0 && <Fallos tipo="error">{mensaje}</Fallos>}

                <div className='campo'>
                    <label htmlFor='nombre'>Gasto</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='nombre del gasto'
                        value={nombre}
                        onChange={(e) => { setNombre(e.target.value); setMensaje('') }}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='monto'>Monto</label>
                    <input
                        id='monto'
                        type='number'
                        placeholder='monto del gasto'
                        value={monto}
                        onChange={(e) => { setMonto(Number(e.target.value)); setMensaje('') }}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Categoria</label>
                    <select id='categoria'
                        value={categoria}
                        onChange={(e) => { setCategoria(e.target.value); setMensaje('') }}>
                        <option value="">-- Selecciona categoria --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="varios">Gastos varios</option>
                    </select>
                </div>
                <div className='campo'>
                    <label htmlFor='nombre'>Descripcion</label>
                    <textarea
                        id='descripcion'
                        type='text'
                        placeholder='descripcion corta del gasto'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <input
                    type='submit'
                    value={esEditando ? 'Aplicar cambios' : 'Añadir gasto'} />
            </form>
        </div>
    )
}

export default NuevoGasto
