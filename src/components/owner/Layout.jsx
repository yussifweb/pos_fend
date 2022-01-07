import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import ownerroutes from '../../routes/ownerroutes';
import Navbar from '../global/Navbar';


const Layout = () => {
    return (
        <div className='sb-nav-fixed'>
            <Navbar />

           <div id="layoutSidenav_content">
            <main>
                <Switch>
                    {ownerroutes.map((route, idx) =>{
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

                    <Redirect from="/owner" to="/owner" />
                </Switch> 
            </main>

        </div> 
        </div>

    )
}

export default Layout;