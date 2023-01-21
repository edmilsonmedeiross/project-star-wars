import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MultipleFiltersContext from './MultipleFiltersContext';

function MultipleFiltersProvider({ children }) {
  const [headerValue, setHeaderValue] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filterButton, setFilterButton] = useState('');

  const values = useMemo(
    () => ({ headerValue,
      comparisonValue,
      numberFilter,
      setHeaderValue,
      setComparisonValue,
      setNumberFilter,
      filterButton,
      setFilterButton }),
    [headerValue, comparisonValue,
      numberFilter, setHeaderValue,
      setComparisonValue, setNumberFilter,
      filterButton, setFilterButton],
  );

  return (
    <MultipleFiltersContext.Provider value={ values }>
      {children}
    </MultipleFiltersContext.Provider>
  );
}

MultipleFiltersProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default MultipleFiltersProvider;