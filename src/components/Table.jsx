import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetsContext';
import MultipleFiltersContext from '../context/MultipleFiltersContext';

function Table({ nameFilter }) {
  const { planets, isLoading } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
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
    const newPlanets = planets.filter((planet) => {
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
  };

  const headers = Object.keys(planets[0]);

  return (
    <div>
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
