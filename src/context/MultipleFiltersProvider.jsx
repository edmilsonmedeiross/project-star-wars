import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MultipleFiltersContext from './MultipleFiltersContext';

function MultipleFiltersProvider({ children }) {
  const dataOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [headerValue, setHeaderValue] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filterButton, setFilterButton] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [arrayOptions, setArrayOptions] = useState(dataOptions);

  const filterOptions = () => {
    const filteredOptions = arrayOptions.filter((option) => (
      option !== headerValue
    ));
    setArrayOptions(filteredOptions);
    setHeaderValue(arrayOptions[0]);
  };

  const values = useMemo(
    () => ({ headerValue,
      comparisonValue,
      numberFilter,
      selectedFilter,
      arrayOptions,
      filterButton,
      setSelectedFilter,
      setArrayOptions,
      setHeaderValue,
      setComparisonValue,
      setNumberFilter,
      filterOptions,
      setFilterButton }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerValue, arrayOptions, comparisonValue,
      numberFilter, filterButton, selectedFilter],
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
