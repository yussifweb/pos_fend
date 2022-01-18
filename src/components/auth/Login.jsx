import React, {useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';



const Login = () => {
const history = useHistory();

const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
    error_list: [],
});

    const handleInput = (e) =>{
    e.persist();
    setLoginInput({...loginInput, [e.target.name]: e.target.value});
};

const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: loginInput.name,
        email: loginInput.email,
        password: loginInput.password,
    };

            axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                localStorage.setItem('role', res.data.role);
                swal("Success", res.data.message, "success");
                history.push('/');
            }else if(res.data.status === 401){
                swal("Warning", res.data.message, "warning");
            } else {
                setLoginInput({...loginInput, error_list: res.data.validation_errors})
            }
        });
        });
    };
    
    return (
        <>

<div className="w-full h-screen font-sans bg-cover bg-landscape bg-blue-500">
    <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
            <div className="leading-loose">
                <form onSubmit={loginSubmit} className="max-w-sm p-10 m-auto bg-white rounded shadow-xl">
                    <p className="mb-8 text-2xl font-light text-center text-gray-700">
                        Login
                    </p>
                   
                    <div className="mb-2">
                        <div className=" relative ">
                            <input type="text" name="email" id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none
                            border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                            shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={loginInput.email} placeholder="email"/>
                            <span className="text-red-300 text-xs">{loginInput.error_list.email}</span>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className=" relative ">
                                <input type="password" name="password" id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none
                                border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base
                                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={loginInput.password} placeholder="password"/>
                                <span className="text-red-300 text-xs">{loginInput.error_list.password}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500
                                focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base
                                font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <Link to="/register" className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                    Create an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login