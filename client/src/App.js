import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'; //link can be here as well if needed
import './App.css';
import Dash from "./components/Dash";
import Create from "./components/Create";
import Edit from "./components/Edit";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Dashboard/Default Route */}
        <Route path="/" element={<Dash />} />
        {/* Create Note Route */}
        <Route path="/notes/new" element={<Create />} />
        {/* Edit Note Route */}
        <Route path="/notes/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
