import axios from 'axios';
import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';

const Register = () => {
    const history = useHistory();
const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    error_list: [],
});

const handleInput = (e) =>{
    e.persist();
    setRegisterInput({...registerInput, [e.target.name]: e.target.value});
};

const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: registerInput.name,
        email: registerInput.email,
        password: registerInput.password,
        password_confirmation: registerInput.password_confirmation,
    };

    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/register`, data).then(res => {
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                history.push('/');

            } else {
                setRegisterInput({...registerInput, error_list: res.data.validation_errors})
            }
        });
    });
}

    return (
<div className="w-full h-screen font-sans bg-cover bg-landscape bg-blue-500">
    <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
            <div className="leading-loose">
<div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow-xl dark:bg-gray-600 sm:px-6 md:px-8 lg:px-10">
    <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
        Create a New Account
    </div>
    <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account?
        <Link to="/login" className="text-sm text-blue-500 no-underline hover:text-blue-700 ml-2">
            Sign In
        </Link>
    </span>
    <div className="p-6 mt-8">
       <form onSubmit={registerSubmit}>
            <div className="flex flex-col mb-2">
                <div className=" relative ">
                    <input type="text" id="create-account-name" className=" rounded-lg border-transparent flex-1 appearance-none border
                    border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" onChange={handleInput} value={registerInput.name} placeholder="Name"/>
                    <span className="text-red-300 text-xs">{registerInput.error_list.name}</span>
                    </div>
                </div>

                <div className="flex flex-col mb-2">
                    <div className=" relative ">
                        <input type="email" name="email" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none
                        border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base
                        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={registerInput.email} placeholder="Email"/>
                        <span className="text-red-300 text-xs">{registerInput.error_list.email}</span>
                    </div>
                </div>
                <div className="flex flex-col mb-2">
                    <div className="relative ">
                        <input type="password" name="password" id="password" className=" rounded-lg border-transparent flex-1 appearance-none
                        border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base
                        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={registerInput.password} placeholder="Password"/>
                        <span className="text-red-300 text-xs">{registerInput.error_list.password}</span>
                    </div>
                </div>
                <div className="flex flex-col mb-2">
                    <div className="relative ">
                        <input type="password" name="password_confirmation" id="password_confirmation" className="rounded-lg border-transparent flex-1 appearance-none
                        border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base
                        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={registerInput.password_confirmation} placeholder="Confirm Password"/>
                    </div>
                </div>

                    <div className="flex w-full my-4">
                        <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500
                        focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base
                        font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

        </div>
        </div>
        </div>
        </div>
    )
}

export default Register