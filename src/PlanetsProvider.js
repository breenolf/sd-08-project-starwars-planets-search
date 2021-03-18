import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const planetsContext = createContext([]);

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [],
    },
  );
  useEffect(() => {
    const fetchPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(url).then((res) => res.json());
      console.log('results', results);
      setPlanets(results || []);
      setFilteredPlanets(results || []);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filterPlanetsByName = () => {
      const { name } = filters.filterByName;
      const planetsByName = planets
        .filter((planet) => planet.name.toLowerCase().includes(name));
      return planetsByName;
    };

    const filterPlanetsByNumericValues = (planetsArray, numericFilterObject) => {
      const { column, comparison, value } = numericFilterObject;
      const planetsFilteredByNumericValues = planetsArray.filter((planet) => {
        const columnValue = Number(planet[column]);
        const compareValue = Number(value);
        if (comparison === 'menor que') {
          return columnValue < compareValue;
        }
        if (comparison === 'maior que') {
          return columnValue > compareValue;
        }
        return columnValue === compareValue;
      });
      return planetsFilteredByNumericValues;
    };
    // criar filtro numerico pela manhã
    const newPlanets = filterPlanetsByName();
    if (filters.filterByNumericValues.length > 0) {
      const newValuePlanets = filters.filterByNumericValues
        .reduce((acc, curr) => (filterPlanetsByNumericValues(acc, curr)), newPlanets);
      setFilteredPlanets(newValuePlanets);
    } else {
      setFilteredPlanets(newPlanets);
    }
  }, [filters]);

  const planetsValue = {
    filteredPlanets,
    setName: (typedValue) => setFilters(
      { ...filters, filterByName: { name: typedValue } },
    ),
    filters,
    setNumericFilter: (column, comparison, value) => setFilters(
      { ...filters,
        filterByNumericValues:
        [...filters.filterByNumericValues, { column, comparison, value }],
      },
    ),
  };

  return (
    <planetsContext.Provider value={ planetsValue }>
      {
        children
      }
    </planetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default PlanetsProvider;
