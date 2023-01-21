import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetsContext';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

function Table({ nameFilter }) {
  const { planets, isLoading } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [renderFilter, setRenderFilter] = useState([]);

  const {
    headerValue,
    comparisonValue,
    numberFilter,
  } = useContext(MultipleFiltersContext);

  useEffect(() => {
    const setPlanet = async () => {
      setFilteredPlanets(planets);
    };
    setPlanet();
  }, [planets]);

  if (isLoading || !planets || !filteredPlanets) {
    return <p>Carregando...</p>;
  }

  let filter = planets;

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
    setRenderFilter([...renderFilter,
      `${headerValue} ${comparisonValue} ${numberFilter}`]);
  };

  const headers = Object.keys(planets[0]);

  /*  const removeFilter = ({ target }) => {
    console.log('oioi');
    console.log(target.id);
    const removed = renderFilter.splice(target.id, 1);
    // setRenderFilter(renderFilter.filter((el, index) => el[index] !== target.id));
    setRenderFilter(removed);
  }; */

  return (
    <div>
      {renderFilter.map((el, index) => (
        <p key={ el + index }>
          {el}
          <button
            type="button"
            id={ index }
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
