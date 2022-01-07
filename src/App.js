import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Index from './components/Index';
import OwnerIndex from './components/owner/OwnerIndex';
import AdminPrivateRoutes from './AdminPrivateRoutes';
import Page403 from './components/error/Page403';
import Page404 from './components/error/Page404';
import OwnerPrivateRoutes from './OwnerPrivateRoutes';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App() {
  return (
    <div className="">
      <Router>
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} /> */}
          <AdminPrivateRoutes path="/admin" name="Admin" />
          <OwnerPrivateRoutes path="/owner" name="Owner" />

          {/* <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} /> */}

          <Route path="/" exact component={Index} />
          {/* <Route path="/owner" exact component={OwnerIndex} /> */}
          {/* <Route path="/admin" exact component={AdminIndex} /> */}

          
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>

          {/* <PublicRoutes path="/" name="Home" /> */}
          {/* <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} /> */}

          <Route path="/403" exact component={Page403} />
          <Route path="/404" exact component={Page404} />

          {/* <Route path="/admin" name="Admin" render={(props) => <Layout {...props} />} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
