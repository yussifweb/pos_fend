import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, Badge, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Redirect, Route, Switch, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import AddCategory from '../category/AddCategory';
import AddStore from '../store/AddStore';
import ViewCategory from '../category/ViewCategory';
import ViewStores from '../store/ViewStores';
import EditCategory from '../category/EditCategory';
import AddProduct from '../products/AddProducts';
import ViewProducts from '../products/ViewProducts';
import EditProduct from '../products/EditProduct';
import ViewCategories from '../sales/ViewCategories';
import ProductList from '../sales/ProductList';
import ProductDetail from '../sales/ProductDetail';
import Cart from '../store/Cart';
import Checkout from '../store/Checkout';
import Order from '../orders/Order';
import { ShoppingCart } from '@mui/icons-material';


// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);

    // useEffect(() => {
    //     axios.get(`/api/checkingAuth`).then(res =>{
    //         if (res.status === 200) {
    //            setAuthenticated(true); 
    //         }
    //         setloading(false);
    //     });

    //     return () => {
    //         setAuthenticated(false);
    //     };
    // }, []);

    if (!localStorage.getItem('auth_token')) {
        history.push('/login');
    }

    // axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    //     if (err.response.status === 401) {
    //         swal("Unauthorized", err.response.data.message, "warning");
    //         history.push('/login');
    //     }
    //     return Promise.reject(err);
    // });

    // axios.interceptors.response.use(function (response){
    //     return response;
    // }, function (error) {
    //     if (error.response.status === 403) {
    //         swal("Access Denied", error.response.data.message, "warning");
    //         history.push('/403');
    //     }else if (error.response.status === 404) {
    //         swal("Page Not Found", error.response.data.message, "warning");
    //         history.push('/404');
    //     }
    //     return Promise.reject(error);
    // });

  const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                history.push('/login');
            } else {
                
            }
        })
    }

  var AuthButtons = '';

    if (!localStorage.getItem('auth_token')) {
        AuthButtons = "";
    } else {
        AuthButtons = (
          <Button color="inherit" onClick={logoutSubmit}>
               <i className="fas fa-power-off pr-1"></i>
                    Logout
          </Button>
        );
    }

  const drawer = (
    <div>
      <Toolbar/>

        <Typography variant="h6" component="div">
            Welcome
          </Typography>

      <Divider />
      <ul className="px-4 pt-3">
      <li className="mb-1">
        <button className="align-items-center collapsed outline-hidden" data-bs-toggle="collapse" data-bs-target="#first-collapse" aria-expanded="true">
        <i className="fa fa-list-alt gray-500"></i> Sales
        </button>
        <div className="collapse shown" id="first-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="/view-categories" className="dropdown-item rounded">View Categories</Link></li>
            <li><Link to="/cart" className="dropdown-item rounded">Cart</Link></li>
            <li><Link to="/order" className="dropdown-item rounded">Orders</Link></li>
          </ul>
        </div>
      </li>
    </ul>
      
      <Divider />
      <ul className="px-4 pt-3">
      <li className="mb-1">
        <button className="align-items-center collapsed outline-hidden" data-bs-toggle="collapse" data-bs-target="#product-collapse" aria-expanded="true">
        <i className="fa fa-list-alt gray-500"></i> Products
        </button>
        <div className="collapse shown" id="product-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="/add-product" className="dropdown-item rounded">Add Product</Link></li>
            <li><Link to="/view-products" className="dropdown-item rounded">View Products</Link></li>
          </ul>
        </div>
      </li>
    </ul>
      
      <Divider />

      <ul className="px-4 pt-3">
      <li className="mb-1">
        <button className="align-items-center collapsed outline-hidden" data-bs-toggle="collapse" data-bs-target="#second-collapse" aria-expanded="true">
        <i className="fa fa-list-alt gray-500"></i> Categories
        </button>
        <div className="collapse shown" id="second-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="/add-category" className="dropdown-item rounded">Add Category</Link></li>
            <li><Link to="/view-category" className="dropdown-item rounded">View Categories</Link></li>
          </ul>
        </div>
      </li>
    </ul>

      <Divider />

    <ul className="px-4 pt-3">
      <li className="mb-1">
        <button className="align-items-center collapsed outline-hidden" data-bs-toggle="collapse" data-bs-target="#third-collapse" aria-expanded="true">
        <i className="fa fa-list-alt gray-500"></i> Store
        </button>
        <div className="collapse shown" id="third-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="/add-store" className="dropdown-item rounded">Add Store</Link></li>
            <li><Link to="/view-stores" className="dropdown-item rounded">View Stores</Link></li>
          </ul>
        </div>
      </li>
    </ul>


    {/* FOR STORE */}
    
    {/* <div classNameName="dropdown">
        <ul>
            <li classNameName="d-flex p-3 link-dark text-decoration-none" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                Home
            </li>
      <ul classNameName="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
        <li><a classNameName="dropdown-item" href="#">New project...</a></li>
        <li><a classNameName="dropdown-item" href="#">Settings</a></li>
        <li><a classNameName="dropdown-item" href="#">Profile</a></li>
        <li><hr classNameName="dropdown-divider" /></li>
        <li><a classNameName="dropdown-item" href="#">Sign out</a></li>
      </ul>
      </ul>
    </div> */}

    {/* FOR STORE */}


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed" color="success"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      <Toolbar component="div">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {document.title}
          </Typography>
          <Link to="/cart" className="nav-item nav-link text-white">
          <Tooltip title="Cart">
          <IconButton size="large" aria-label="show cart" color="inherit">
          <Badge badgeContent={0} color="error">
                <ShoppingCart />
          </Badge>
          </IconButton>
          </Tooltip>
          </Link>
          {AuthButtons}


          {/* <div className="float-end">
            {AuthButtons}
          </div> */}
          
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      <Toolbar />

        <Switch>

          <Route path="/add-store" exact component={AddStore} />
          <Route path="/view-stores" exact component={ViewStores} />

          <Route path="/add-category" exact component={AddCategory} />          
          <Route path="/view-category" exact component={ViewCategory} />
          <Route path="/edit-category/:id" exact component={EditCategory} />

          <Route path="/add-product" exact component={AddProduct} />
          <Route path="/view-products" exact component={ViewProducts} />
          <Route path="/edit-product/:id" exact component={EditProduct} /> 

          <Route path="/view-categories" exact component={ViewCategories} />
          <Route path="/productlist/:slug" exact component={ProductList} />
          <Route path="/productlist/:category/:product" exact component={ProductDetail} />

          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/orders" exact component={Order} />
         
          {/* <Redirect to="/login" /> */}
          {/* <Redirect from="/" to="/" />   */}

          </Switch>

          </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
