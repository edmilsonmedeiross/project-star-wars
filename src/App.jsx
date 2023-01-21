import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Table from './components/Table';
import PlanetContext from './components/context/PlanetsContext';
import useFetch from './hooks/useFetch';

function App() {
  const [data, makeFetch, isLoading, setData] = useFetch();
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      await makeFetch();
    };

    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ planets: data,
    isLoading,
    setData }), [data, isLoading, setData]);

  return (
    <PlanetContext.Provider value={ value }>
      <input
        type="text"
        name="nameFilter"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ (e) => { setNameFilter(e.target.value); } }
      />
      <div>
        <Table nameFilter={ nameFilter } />
        <span>Hello, App!</span>
      </div>
    </PlanetContext.Provider>
  );
}

export default App;
