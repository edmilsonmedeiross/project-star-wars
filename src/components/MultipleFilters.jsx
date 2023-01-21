import React, { useContext } from 'react';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

function MultipleFilters() {
  const dataOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const dataComparison = ['maior que', 'menor que', 'igual a'];

  const { headerValue,
    comparisonValue,
    numberFilter,
    setHeaderValue,
    setComparisonValue,
    setNumberFilter,
  } = useContext(MultipleFiltersContext);

  return (
    <form>
      <select
        data-testid="column-filter"
        selected={ headerValue }
        onChange={ (e) => { setHeaderValue(e.target.value); } }
      >
        { dataOptions.map((el) => <option key={ el } value={ el }>{el}</option>) }
      </select>
      <select
        data-testid="comparison-filter"
        selected={ comparisonValue }
        onChange={ (e) => { setComparisonValue(e.target.value); } }
      >
        { dataComparison.map((el) => <option key={ el } value={ el }>{el}</option>) }
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ numberFilter }
        onChange={ (e) => { setNumberFilter(e.target.value); } }
      />
    </form>
  );
}

export default MultipleFilters;
