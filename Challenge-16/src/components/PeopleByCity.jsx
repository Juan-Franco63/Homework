import { graphData } from "../data/graphData";

export default function PeopleByCity({ cityName }) {
  const people = graphData.nodes.filter(
    node => typeof node.age === "number" && node.city === cityName
  );

  return (
    <div>
      <h3>Personas en {cityName}</h3>
      {people.length === 0 ? (
        <p>No hay personas registradas en esta ciudad.</p>
      ) : (
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.id} ({p.age} años)</li>
          ))}
        </ul>
      )}
    </div>
  );
}
