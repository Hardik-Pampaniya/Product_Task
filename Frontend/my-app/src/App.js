// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={CategoryList} />
          <PrivateRoute path="/products" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
