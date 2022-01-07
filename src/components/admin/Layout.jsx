import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import adminroutes from '../../routes/adminroutes';
import Navbar from '../global/Navbar';


const Layout = () => {
    return (
        <div className='sb-nav-fixed'>
            <Navbar />

            <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
            </div>

           <div id="layoutSidenav_content">
            <main>
                <Switch>
                    {adminroutes.map((route, idx) =>{
                        return (
                            route.component && (
                                <Route key={idx} path={route.path}
                                exact={route.exact} name={route.name}
                                render={(props) => (
                                    <route.component {...props} />
                                )} />
                            )
                        )
                    })}

                    <Redirect from="/admin" to="/admin" />
                </Switch> 
            </main>

        </div>  
        </div> 
        </div>

    )
}

export default Layout;