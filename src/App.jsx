import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Table from './components/Table';
import useFetch from './hooks/useFetch';
import PlanetContext from './context/PlanetsContext';
import MultipleFilters from './components/MultipleFilters';
import MultipleFiltersProvider from './context/MultipleFiltersProvider';

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
      <MultipleFiltersProvider>
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ (e) => { setNameFilter(e.target.value); } }
        />
        <div>
          <MultipleFilters />
          <Table nameFilter={ nameFilter } />
          <span>Hello, App!</span>
        </div>
      </MultipleFiltersProvider>
    </PlanetContext.Provider>
  );
}

export default App;
