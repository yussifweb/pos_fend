import axios from 'axios';
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';


const Navbar = () => {

const history = useHistory();

    
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                history.push('/');
            } else {
                
            }
        })
    }
    var AuthButtons = '';

    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <>
                <Link to="/register" className="inline-flex items-center border-0 py-1 px-4 mr-4 bg-green-500 hover:bg-green-700 focus:ring-green-500
                focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full text-base mt-4 md:mt-0">
               <i className="fas fa-user-plus pr-1"></i>
                    Register
                </Link>
                <Link to="/login" className="inline-flex items-center border-0 py-1 px-4 mr-4 bg-green-500 hover:bg-green-700 focus:ring-green-500
                focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full text-base mt-4 md:mt-0">
               <i className="fas fa-sign-in-alt pr-1"></i>
                    Login
                </Link>
            </>
        );
    } else {
        AuthButtons = (
                <button className="inline-flex items-center border-0 py-1 px-4 mr-4 bg-green-500 hover:bg-green-700 focus:ring-green-500
                focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full text-base mt-4 md:mt-0" onClick={logoutSubmit}>
               <i className="fas fa-power-off pr-1"></i>
                    Logout
                </button>
        );
    }

    return (
        <>

<nav className="flex bg-white flex-wrap items-center justify-between">
    <div className="lg:order-2 w-auto lg:w-1/5 lg:text-center mt-2">
        <p className="text-xl text-gray-800 font-semibold font-heading">
            Welcome
        </p>
    </div>
    <div className="block lg:hidden">
        <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>
                    Menu
                </title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                </path>
            </svg>
        </button>
    </div>
    <div className="navbar-menu hidden lg:order-1 lg:block w-full lg:w-2/5">
        {/* <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" to="#">
            Home
        </Link>
        <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" to="#">
            Team
        </Link>
        <Link className="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600" to="#">
            Galery
        </Link> */}
    </div>
    <div className="navbar-menu hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right flex items-center">
        {AuthButtons}
    </div>
    </nav>

            
        </>
    )
}

export default Navbar

