import React, { useContext } from 'react';
import { DataContext } from '../data/DataContext';

const Table = () => {
  const { data, loading, filters, setFilters } = useContext(DataContext);

  function handleChange({ target: { value } }) {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  if (loading) return <h1>Carregando ...</h1>;

  return (
    <div>
      <input data-testid="name-filter" onChange={ handleChange } />
      <table>
        <thead>
          <tr>
            {data.headers.map((header) => <th key={ header }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.state.map((planet, index) => (
            <tr key={ index }>
              <td>
                {planet.name}
              </td>
              <td>
                {planet.rotation_period}
              </td>
              <td>
                {planet.orbital_period}
              </td>
              <td>
                {planet.diameter}
              </td>
              <td>
                {planet.climate}
              </td>
              <td>
                {planet.gravity}
              </td>
              <td>
                {planet.terrain}
              </td>
              <td>
                {planet.surface_water}
              </td>
              <td>
                {planet.population}
              </td>
              <td>
                {planet.films}
              </td>
              <td>
                {planet.created}
              </td>
              <td>
                {planet.edited}
              </td>
              <td>
                {planet.url}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  );
};

export default Table;
