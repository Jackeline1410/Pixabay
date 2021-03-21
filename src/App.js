import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import ListadoImagenes from './ListadoImagenes';

function App() {

  // state de la app
  const [busqueda,  guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]); 

  useEffect(() => {
   const consultarAPI = async () => {
    if(busqueda === '') return;

    const imagenesPorPagina = 30;
    const key = '20788402-8f344b6fae06969c3ad35e0ca';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagenes(resultado.hits);
   }
   consultarAPI();
  }, [busqueda])

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
      </div>
    </div>
  );
}

export default App;
