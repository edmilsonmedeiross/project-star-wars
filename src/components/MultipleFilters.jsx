import React, { useContext } from 'react';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

function MultipleFilters() {
  const dataComparison = ['maior que', 'menor que', 'igual a'];

  const { headerValue,
    comparisonValue,
    numberFilter,
    setHeaderValue,
    setComparisonValue,
    setNumberFilter,
    arrayOptions,
  } = useContext(MultipleFiltersContext);

  const createOptions = () => arrayOptions.map(
    (ele, index) => (
      <option
        key={ ele + index }
        value={ ele }
      >
        {ele}
      </option>),
  );

  return (
    <form>
      <select
        data-testid="column-filter"
        value={ headerValue }
        // selected={ headerValue }
        onChange={ (e) => { setHeaderValue(e.target.value); } }
      >
        {
          createOptions()
        }

      </select>
      <select
        data-testid="comparison-filter"
        selected={ comparisonValue }
        onChange={ (e) => { setComparisonValue(e.target.value); } }
      >
        { dataComparison.map((el, index) => (
          <option
            key={ el }
            id={ index }
            value={ el }
          >
            {el}
          </option>)) }
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
