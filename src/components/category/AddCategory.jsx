import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../global/Navbar'

const AddCategory = () => {

const history = useHistory();

const [Authenticated, setAuthenticated] = useState(false);
const [loading, setloading] = useState(true);
const [storeList, setStoreList] = useState([]);
const role = localStorage.getItem('role');

    useEffect(() => {
    if(role === 'admin') {
        axios.get(`/api/checkingAuthenticated`).then(res =>{
                if (res.status === 200) {
                setAuthenticated(true); 
                }
                setloading(false);
            });
    } else if (role === 'owner') {
        axios.get(`/api/checkingAuthenticatedOwner`).then(res =>{
                if (res.status === 200) {
                setAuthenticated(true); 
                }
                setloading(false);
            });
        }else if (role === '') {
            swal("Access Denied", "You're not an Admin/Store Owner", "warning");
            history.push('/403');
            setloading(false);
        }
            return () => {
            setAuthenticated(false);
            };
    }, [role, history]);

    const [categoryInput, setCategoryInput] = useState({
    name: '',
    slug: '',
    error_list: [],
    });

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store); 
            }
        });
    }, [])

    

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


    const handleInput = (e) =>{
    e.persist();
    setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
    };

    const categorySubmit = (e) => {
    e.preventDefault();

        const data = {
            name: categoryInput.name,
            slug: categoryInput.slug,
            store_id: categoryInput.store_id,
        };

        if (role === 'admin') {
            axios.post(`api/admin-add-category`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/');
            } else if(res.data.status === 401){
                swal("Warning", res.data.message, "warning");
            } else {
                setCategoryInput({...categoryInput, error_list: res.data.validation_errors})
            }
            });
        } else if (role === 'owner'){
          axios.post(`api/add-category`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/');
            } else if(res.data.status === 401){
                swal("Warning", res.data.message, "warning");
            } else {
                setCategoryInput({...categoryInput, error_list: res.data.validation_errors})
            }
            });  
        }
        };


    return (       
        <>
        
        <Navbar />
        <div className="w-full h-screen font-sans bg-cover bg-landscape bg-gray-400">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
            <div className="w-full max-w-lg">
                <div className="leading-loose">
                    <form onSubmit={categorySubmit} className="max-w-lg p-10 m-auto bg-white bg-opacity-25 rounded shadow-xl">
                        <p className="mb-8 text-2xl font-bold text-center text-white">
                            Add Category&nbsp;&nbsp;
                            <Link to="/view-categories" className="place-items-end no-underline	py-2 px-3  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500
                                    focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base
                                    font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                View Categories
                            </Link>
                        </p>
                    
                        <div className="mb-2">
                            <div className="relative ">
                                <input type="text" name="name" id="category-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none
                                border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={categoryInput.name} placeholder="Category Name"/>
                                <span className="text-red-500 text-xs">{categoryInput.error_list.name}</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className=" relative ">
                                    <input type="text" name="slug" id="category-with-bg-slug" className=" rounded-lg border-transparent flex-1 appearance-none
                                    border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base
                                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={handleInput} value={categoryInput.slug} placeholder="Slug"/>
                                    <span className="text-red-500 text-xs">{categoryInput.error_list.slug}</span>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="slug">Select store</label>
                                    <select name="store_id" onChange={handleInput} value={categoryInput.store_id}>
                                        <option>Select store</option>
                                        {storeList.map((item) => {
                                            return(
                                                <option key={item.id} value={item.id}>{item.name}</option>                                                
                                            )
                                        })}                                
                                    </select>
                                    <span className="text-sm text-danger">{categoryInput.error_list.store_id}</span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500
                                    focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base
                                    font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddCategory