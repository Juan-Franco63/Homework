import FriendCityGraph from "./components/FriendCityGraph";
import PeopleByCity from "./components/PeopleByCity";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Challenge-16</h1>

      <div className="card">
        <FriendCityGraph />
      </div>

      <div className="card">
        <PeopleByCity cityName="Bogotá" />
      </div>

      <div className="card">
        <PeopleByCity cityName="Medellín" />
      </div>
    </div>
  );
}

export default App;
