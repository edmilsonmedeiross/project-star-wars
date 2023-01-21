import { createContext } from 'react';

const INITIAL_STATE = {
  headerValue: 'population',
  comparisonValue: 'maior que',
  numberFilter: 0,
};

const MultipleFiltersContext = createContext(INITIAL_STATE);

export default MultipleFiltersContext;
