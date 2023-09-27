import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({
    presupuesto,
    setPresupuesto,
    esValido,
    setEsValido,
    gastado,
    setGastado,
    disponible,
    setDisponible,
    setNuevoPresupuesto }) => {
    return (
        <header>
            <h1>Control de gastos</h1>
            {esValido ?
                <ControlPresupuesto
                    presupuesto={presupuesto}
                    gastado={gastado}
                    disponible={disponible}
                    setPresupuesto={setPresupuesto}
                    setNuevoPresupuesto={setNuevoPresupuesto} />
                :
                <NuevoPresupuesto
                    setPresupuesto={setPresupuesto}
                    setDisponible={setDisponible}
                    setGastado={setGastado}
                    setEsValido={setEsValido} />}
        </header>
    )
}

export default Header
