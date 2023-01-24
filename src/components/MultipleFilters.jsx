import React, { useContext } from 'react';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

export const createOptions = (paran, id) => paran.map(
  (ele, index) => (
    <option
      key={ ele + index }
      value={ ele }
      data-testid={ `${id}-${ele}` }
    >
      {ele}
    </option>),
);

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

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          value={ headerValue }
          onChange={ (e) => { setHeaderValue(e.target.value); } }
        >
          {
            createOptions(arrayOptions, 'option-name')
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
    </div>
  );
}

export default MultipleFilters;
