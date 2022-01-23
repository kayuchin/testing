import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import CustomerPage from './pages/CustomerPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/counter' element={ <CounterPage /> }/>
          <Route path='/customer' element={ <CustomerPage /> }/>
        </Routes>
      </Router>
  );
}

export default App;
