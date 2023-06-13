import './App.css';
import { Landing, Form } from './components/views';
import{ Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component = { Landing } />
      <Route exact path = '/form' component = {Form} />
    </div>
  );
}

export default App;
