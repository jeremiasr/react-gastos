import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'

import IcoAhorro from '../img/icono_ahorro.svg'
import IcoCasa from '../img/icono_casa.svg'
import IcoComida from '../img/icono_comida.svg'
import IcoGastos from '../img/icono_gastos.svg'
import IcoOcio from '../img/icono_ocio.svg'
import IcoSalud from '../img/icono_salud.svg'
import IcoSuscripciones from '../img/icono_suscripciones.svg'

const Gasto = ({ gasto, setEditarGasto, eliminarGasto }) => {
    const opciones = {
        year: 'numeric', month: 'long', day: '2-digit'
    }

    const formatoFecha = fecha => {
        if (fecha) {
            const fechaFormat = new Date(fecha);
            return fechaFormat.toLocaleDateString('es-ES', opciones)
        }
    }

    const formatoMonto = (monto) => {
        return monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    const diccionarioIconos = {
        ahorro: IcoAhorro,
        casa: IcoCasa,
        comida: IcoComida,
        varios: IcoGastos,
        entretenimiento: IcoOcio,
        salud: IcoSalud,
        suscripciones: IcoSuscripciones
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => { setEditarGasto(gasto) }}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => { eliminarGasto(gasto) }}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos[gasto.categoria]}
                            alt=''
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{gasto.categoria}</p>
                            <p className="nombre-gasto">{gasto.nombre}</p>
                            <p className="fecha-gasto">{formatoFecha(gasto.fecha)}</p>
                            {gasto.descripcion ? (<span>{gasto.descripcion}</span>) : ''}
                        </div>
                    </div>

                    <p className="cantidad-gasto">{formatoMonto(gasto.monto)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto
