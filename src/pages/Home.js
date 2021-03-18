import React, { useContext, useEffect } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../contexts/PlanetsContext';

function Home() {
  const { fetchPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <Table />
  );
}

export default Home;
