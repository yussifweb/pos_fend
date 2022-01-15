import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Index from './components/Index';
import Page403 from './components/error/Page403';
import Page404 from './components/error/Page404';
import AddCategory from './components/category/AddCategory';
import AddStore from './components/store/AddStore';
import ViewCategory from './components/category/ViewCategory';
import ViewStores from './components/store/ViewStores';
import EditCategory from './components/category/EditCategory';
import AddProduct from './components/products/AddProducts';
import ViewProducts from './components/products/ViewProducts';
import EditProduct from './components/products/EditProduct';

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
          {/* <AdminPrivateRoutes path="/admin" name="Admin" />
          <OwnerPrivateRoutes path="/owner" name="Owner" /> */}

          <Route path="/add-store" exact component={AddStore} />
          <Route path="/view-stores" exact component={ViewStores} />

          <Route path="/add-category" exact component={AddCategory} />          
          <Route path="/view-category" exact component={ViewCategory} />
          <Route path="/edit-category/:id" exact component={EditCategory} />

          <Route path="/add-product" exact component={AddProduct} />
          <Route path="/view-products" exact component={ViewProducts} />
          <Route path="/edit-product/:id" exact component={EditProduct} /> 
          

          {/* <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} /> */}
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>

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
