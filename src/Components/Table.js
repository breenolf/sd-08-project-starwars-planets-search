import React, { useContext, useEffect } from 'react';
import planetsContext from '../Hooks/planetsContext';

function Table() {
  const { data, isFetching } = useContext(planetsContext);
  let tableHeaders = []
  if (data[0]) {
    tableHeaders = Object.keys(data[0]);
  }


  function renderTbody() {
    return (
      <tbody>
        {data.map((obj) => {
          return <tr>
            {Object.entries(obj).map((values,index) => {
              if (values[0] !== 'residents') {
                return <td key={index}>{values[1]}</td>
              }
            })}
          </tr>
        })}
      </tbody>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {!isFetching ?
            tableHeaders.map((header) => {
              if (header !== 'residents') {
                return <th key={header} scope="col">{header}</th>
              }
          }) : <span>Carregando...</span>}
        </tr>
      </thead>
        {!isFetching ? renderTbody() : <span>Carregando...</span>}
    </table>
  )
}

export default Table;
