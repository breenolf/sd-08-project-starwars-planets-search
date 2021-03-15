import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((result) => setData(result.results));
  }, []);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues: { column, comparison, value },
    } = filters;
    const filter = data.filter((planet) => {
      const includesName = planet.name.includes(name);
      switch (comparison) {
      case ('maior que'):
        return parseInt(planet[column], 10) > parseInt(value, 10) && includesName;
      case ('menor que'):
        return parseInt(planet[column], 10) < parseInt(value, 10) && includesName;
      case ('igual a'):
        return parseInt(planet[column], 10) === parseInt(value, 10) && includesName;
      default:
        return includesName;
      }
    });
    setPlanets(filter);
  }, [data, filters]);

  const context = { planets, setPlanets, filters, setFilters };

  return <PlanetsContext.Provider value={ context }>{children}</PlanetsContext.Provider>;
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
