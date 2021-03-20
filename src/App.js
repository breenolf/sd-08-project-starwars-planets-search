import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <div>
        <Table />
      </div>
    </Provider>
  );
}

export default App;
