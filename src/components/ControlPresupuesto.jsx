
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastado, disponible, setNuevoPresupuesto }) => {
    const [porcentaje, setPorcentaje] = useState(0)

    const formatoMonto = (monto) => {
        return monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    useEffect(() => {
        const nuevoPorcentaje = (gastado / presupuesto * 100).toFixed(0);
        setPorcentaje(nuevoPorcentaje)
    }, [gastado])

    const handleResetApp = () => {
        const resultado = confirm('Confirma reiniciar el presupuesto?')
        if (resultado) {
            setNuevoPresupuesto(true)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#ae0749' : '#7d5700',
                        trailColor: '#006e25',
                        textColor: porcentaje > 100 ? '#ae0749' : '#7d5700'
                    })}
                    value={porcentaje}
                    counterClockwise={true}
                    text={`${porcentaje}% gastado`} />
            </div>
            <div className="contenido-presupuesto">
                <button className='reset-app'
                    type='button'
                    onClick={handleResetApp}>
                    Reiniciar presupuesto
                </button>
                <p><span>Presupuesto:</span>{formatoMonto(presupuesto)}</p>
                <p><span>Gastado:</span>{formatoMonto(gastado)}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible:</span>{formatoMonto(disponible)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
