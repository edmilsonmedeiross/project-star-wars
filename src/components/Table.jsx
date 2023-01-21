import { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './context/PlanetsContext';

function Table({ nameFilter }) {
  const { planets, isLoading } = useContext(PlanetContext);

  let filter = planets;

  if (isLoading || !planets) {
    return <p>Carregando...</p>;
  }

  filter = planets.filter((el) => el.name.includes(nameFilter));

  const headers = Object.keys(planets[0]);

  return (
    <div>
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
