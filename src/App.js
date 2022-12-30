import './App.css';
import {Beers} from "./Beers";
import {Pagination} from "./Pagination";
function App() {
  return (
    <div className="App">
      <Pagination>
      <Beers />
      </Pagination>
    </div>
  );
}

export default App;
