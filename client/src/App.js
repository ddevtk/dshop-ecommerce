import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import bootstrap from 'bootstrap';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleProduct from './components/SingleProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products/:id' component={SingleProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
