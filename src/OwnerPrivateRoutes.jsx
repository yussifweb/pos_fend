import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Layout from './components/owner/Layout'

const OwnerPrivateRoutes = ({...rest}) => {

const history = useHistory();
const [Authenticated, setAuthenticated] = useState(false);
const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkingAuthenticatedOwner`).then(res =>{
            if (res.status === 200) {
               setAuthenticated(true); 
            }
            setloading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push('/login');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response){
        return response;
    }, function (error) {
        if (error.response.status === 403) {
            swal("Access Denied", error.response.data.message, "warning");
            history.push('/403');
        }else if (error.response.status === 404) {
            swal("Page Not Found", error.response.data.message, "warning");
            history.push('/404');
        }
        return Promise.reject(error);
    });

    if (loading) {
       return (

<button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>
    loading
</button>
       );
    }

    return (
        <Route {...rest}
        render={({props, location}) =>
        Authenticated ?
        (<Layout {...props} />) :
        (<Redirect to={{pathname: "/login", state: {from: location}}}/>) }/>
    )
}

export default OwnerPrivateRoutes