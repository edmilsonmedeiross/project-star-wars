import React, { useContext, useState } from 'react';
import MultipleFiltersContext from '../context/MultipleFiltersContext';
import { createOptions } from './MultipleFilters';

export default function Order() {
  const dataOptionsOrder = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const { orderTable, setOrderTable } = useContext(MultipleFiltersContext);

  const [radioAsc, setRadioAsc] = useState('ASC');

  return (
    <form>
      <select
        data-testid="column-sort"
        onChange={ (e) => {
          setOrderTable(
            { ...orderTable,
              order: { ...orderTable.order, column: e.target.value } },
          );
        } }
      >
        { createOptions(dataOptionsOrder) }
      </select>
      <label htmlFor="asc">
        <input
          name="radio-order"
          id="asc"
          type="radio"
          value="ASC"
          checked={ radioAsc === 'ASC' }
          data-testid="column-sort-input-asc"
          onChange={ (e) => {
            setOrderTable(
              { ...orderTable,
                order: { ...orderTable.order, sort: e.target.value } },
            );
            setRadioAsc(e.target.value);
          } }
        />
        ASC
      </label>
      <label htmlFor="desc">
        <input
          name="radio-order"
          id="desc"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ (e) => {
            setOrderTable(
              { ...orderTable,
                order: { ...orderTable.order, sort: e.target.value } },
            );
            setRadioAsc(e.target.value);
          } }
        />
        DESC
      </label>
    </form>
  );
}
