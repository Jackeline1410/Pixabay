import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import ListadoImagenes from './ListadoImagenes';

function App() {

  // state de la app
  const [busqueda,  guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]); 
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);
 
  useEffect(() => {
   const consultarAPI = async () => {
    if(busqueda === '') return;

    const imagenesPorPagina = 30;
    const key = '20788402-8f344b6fae06969c3ad35e0ca';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagenes(resultado.hits);

    // calcular el total de paginas
    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);

   }
   consultarAPI();
  }, [busqueda])

  // definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
        imagenes={imagenes}
        />
      <button
        type="button"
        className="btn btn-info mr-1"
        onClick={paginaAnterior}
      >&laquo; Anterior</button>

      <button
        type="button"
        className="btn btn-info mr-1"
        onClick={paginaSiguiente}
      >Siguente &raquo;</button>
      </div>
    </div>
  );
}

export default App;
