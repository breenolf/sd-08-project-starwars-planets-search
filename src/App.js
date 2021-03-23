import React from 'react';
import PlanetContext from './context/PlanetContext';
import Table from './pages/table';

function App() {
  return (
    <PlanetContext>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
      <Table />
    </PlanetContext>
  );
}

export default App;
