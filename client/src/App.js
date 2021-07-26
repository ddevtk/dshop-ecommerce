import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleProduct from './components/SingleProduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Order from './pages/Order';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/order' component={Order} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
