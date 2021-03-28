import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const { filters, setFilters } = useContext(PlanetContext);
  const { filterByName: { name } } = filters;
  // console.log(name);

  function handleChange(e) {
    setFilters({ filterByName: { name: e.target.value } });
  }

  return (
    <div>
      <label htmlFor="Name">
        <input
          type="text"
          name="Name"
          value={ name }
          data-testid="name-filter"
          placeholder="find a planet..."
          onChange={ (e) => handleChange(e) }
        />
      </label>
    </div>
  );
}

export default Form;
