import { useContext } from 'react';
import PlanetContext from './context/PlanetsContext';

export default function Table() {
  const { planets, isLoading } = useContext(PlanetContext);

  if (isLoading || !planets) {
    return <p>Carregando...</p>;
  }

  const headers = Object.keys(planets[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((el) => <th key={ el }>{el}</th>)}
        </tr>
      </thead>

      <tbody>
        {planets.map((ele) => (
          <tr key={ ele.name }>
            {Object.values(ele)
              .map((atr) => <td key={ atr }>{atr}</td>)}
          </tr>))}
      </tbody>
    </table>
  );
}
