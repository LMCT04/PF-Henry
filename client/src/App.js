import logo from './logo.svg';
import './App.css';
import Route from 'react-router-dom';
import Menu from './components/views/menu/menu';


function App() {
  return (
    <div className="App">
      <Route>
        <Route path= "/menu" element={<Menu/>} />
      </Route>
    </div>
  );
}

export default App;
