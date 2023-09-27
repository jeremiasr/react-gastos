import { useState } from "react";
import Fallos from './Fallos'

const NuevoPresupuesto = ({ setPresupuesto, setDisponible, setGastado, setEsValido }) => {
    const [fallo, setFallo] = useState('')
    const [monto, setMonto] = useState('')

    const handleMonto = (e) => {
        e.preventDefault();

        if (!monto || monto <= 0) {
            setEsValido(false)
            setFallo('Valor ingresado no es válido')
            return
        }
        setFallo('')
        setPresupuesto(monto)
        setDisponible(monto)
        setGastado(0)
        setEsValido(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handleMonto} className="formulario">
                <div className="campo">
                    <label htmlFor="monto">Monto de presupuesto inicial</label>

                    <input className="nuevo-presupuesto"
                        id="monto"
                        type="number"
                        placeholder="$0.00"
                        value={monto}
                        onChange={e => { setMonto(Number(e.target.value)) }}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {fallo && <Fallos tipo="error">{fallo}</Fallos>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto
