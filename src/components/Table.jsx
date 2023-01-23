import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetsContext';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

function Table({ nameFilter }) {
  let filter = [];

  const { planets, isLoading } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [reFilterPlanets, setRefilterPlanets] = useState([]);
  const [renderFilter, setRenderFilter] = useState([]);
  const [excludeFilter, setExcludeFilter] = useState([]);

  const {
    headerValue,
    comparisonValue,
    numberFilter,
    setSelectedFilter,
    selectedFilter,
    filterOptions,
    arrayOptions,
    setArrayOptions,
  } = useContext(MultipleFiltersContext);

  useEffect(() => {
    const setPlanet = async () => {
      await setFilteredPlanets(planets);
    };
    setPlanet();
  }, [planets]);

  useEffect(() => {
    if (renderFilter.length > 0) {
      setFilteredPlanets(reFilterPlanets);
    } else {
      setFilteredPlanets(planets);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excludeFilter]);

  if (isLoading || !planets || !filteredPlanets) {
    return <p>Carregando...</p>;
  }

  if (nameFilter) {
    filter = planets
      .filter((el) => el.name.includes(nameFilter));
  } else {
    filter = filteredPlanets;
  }

  const handleClick = () => {
    const newPlanets = filteredPlanets.filter((planet) => {
      if (comparisonValue === 'menor que') {
        return +planet[headerValue] < +numberFilter;
      }
      if (comparisonValue === 'igual a') {
        return +planet[headerValue] === +numberFilter;
      }
      if (comparisonValue === 'maior que') {
        return +planet[headerValue] > +numberFilter;
      }
      return planet;
    });

    setFilteredPlanets(newPlanets);
    setSelectedFilter([...selectedFilter, headerValue]);
    setRenderFilter([...renderFilter,
      `${headerValue} ${comparisonValue} ${numberFilter}`]);
    filterOptions();
  };

  const reFilter = async (e) => {
    let tabu = '';

    if (renderFilter.length > 0) {
      tabu = renderFilter[0].split(' ');
    } else {
      tabu = '';
    }

    const refilterComparison = `${tabu[1]} ${tabu[2]}`;
    const refilterColunm = `${tabu[0]}`;
    const refilterNumeric = `${tabu[3]}`;

    const newPlanets1 = planets.filter((planet) => {
      if (refilterComparison === 'menor que') {
        return +planet[refilterColunm] < +refilterNumeric;
      }
      if (refilterComparison === 'igual a') {
        return +planet[refilterColunm] === +refilterNumeric;
      }
      if (refilterComparison === 'maior que') {
        return +planet[refilterColunm] > +refilterNumeric;
      }
      return planet;
    });

    setRefilterPlanets(newPlanets1);
    setExcludeFilter([...excludeFilter, e.target.name]);
  };

  const handleClickExclude = (e) => {
    setArrayOptions([...arrayOptions, e.target.name]);
    renderFilter.splice(e.target.id, 1);
    setRenderFilter([...renderFilter]);
    reFilter(e);
  };

  const removeAllFilters = () => {
    setRenderFilter([]);
    setExcludeFilter([]);
  };

  const headers = Object.keys(planets[0]);

  return (
    <div>
      {renderFilter.map((el, index) => (
        <p key={ el + index } data-testid="filter">
          {el}
          <button
            type="button"
            id={ index }
            name={ renderFilter[index] }
            onClick={ handleClickExclude }
          >
            excluir
          </button>
        </p>))}
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        REMOVER FILTROS
      </button>
      <table>
        <thead>
          <tr>
            {headers.map((el) => <th key={ el }>{el}</th>)}
          </tr>
        </thead>
        <tbody>
          {filter.map((ele) => (
            <tr key={ ele.name }>
              {Object.values(ele)
                .map((atr) => <td key={ atr }>{atr}</td>)}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  nameFilter: PropTypes.string.isRequired,
};

export default Table;
