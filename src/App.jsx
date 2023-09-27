import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import NuevoGasto from './components/NuevoGasto';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);

  const [listaGastos, setListaGastos] = useState([]);
  const [editarGasto, setEditarGasto] = useState({});


  const [esValido, setEsValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(false)

  const [filtroCategoria, setFiltroCategoria] = useState('');

  const objPresupuesto = {
    presupuesto, gastado, disponible, esValido, listaGastos
  }

  useEffect(() => {
    const leerPresupuesto = () => {
      const presupuestoLS = JSON.parse(localStorage.getItem('presupuestoLS')) ?? objPresupuesto;

      setPresupuesto(presupuestoLS.presupuesto)
      setGastado(presupuestoLS.gastado)
      setDisponible(presupuestoLS.disponible)
      setListaGastos(presupuestoLS.listaGastos)
      setEsValido(presupuestoLS.esValido)
      setModal(false)
    }
    leerPresupuesto();
  }, [])

  useEffect(() => {
    objPresupuesto.esValido = esValido
    objPresupuesto.presupuesto = presupuesto
    objPresupuesto.gastado = gastado
    objPresupuesto.disponible = disponible
    objPresupuesto.listaGastos = listaGastos

    localStorage.setItem('presupuestoLS', JSON.stringify(objPresupuesto))
  }, [esValido, presupuesto, gastado, disponible])

  useEffect(() => {
    if (nuevoPresupuesto) {
      objPresupuesto.esValido = false
      objPresupuesto.presupuesto = 0
      objPresupuesto.gastado = 0
      objPresupuesto.disponible = 0
      objPresupuesto.listaGastos = []

      setListaGastos([])
      setDisponible(0)
      setGastado(0)
      setPresupuesto(0)
      setEsValido(false)
    }
  }, [nuevoPresupuesto])

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      handleNuevoGasto();
    }
  }, [editarGasto])

  const eliminarGasto = gasto => {
    const listaGastosActualizada = listaGastos.filter(eliGasto => eliGasto.id !== gasto.id)
    setListaGastos(listaGastosActualizada)
    setDisponible(disponible + gasto.monto)
    setGastado(gastado - gasto.monto)
  }

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 400);
  }

  return (

    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        esValido={esValido}
        setEsValido={setEsValido}
        gastado={gastado}
        setGastado={setGastado}
        disponible={disponible}
        setDisponible={setDisponible}
        setNuevoPresupuesto={setNuevoPresupuesto} />
      {esValido && (
        <>
          <main>
            <Filtros
              filtroCategoria={filtroCategoria}
              setFiltroCategoria={setFiltroCategoria} />
            <ListadoGastos
              listaGastos={listaGastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtroCategoria={filtroCategoria} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto}
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (<NuevoGasto
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        listaGastos={listaGastos}
        setListaGastos={setListaGastos}
        gastado={gastado}
        setGastado={setGastado}
        disponible={disponible}
        setDisponible={setDisponible}
        editarGasto={editarGasto}
        setEditarGasto={setEditarGasto}
      />)}
    </div>
  )
}

export default App
