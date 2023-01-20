import './App.css';
import { useEffect, useMemo } from 'react';
import Table from './components/Table';
import PlanetContext from './components/context/PlanetsContext';
import useFetch from './hooks/useFetch';

function App() {
  const [data, makeFetch, isLoading] = useFetch();

  useEffect(() => {
    const fetchPlanets = async () => {
      await makeFetch();
    };

    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ planets: data, isLoading }), [data, isLoading]);

  return (
    <PlanetContext.Provider value={ value }>
      <div>
        <Table />
        <span>Hello, App!</span>
      </div>
    </PlanetContext.Provider>
  );
}

export default App;
