import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Menu = () => {
    return (
        <>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Active Users</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Inactive Users</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Add User</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Add Product</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">View Products</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Add Category</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">View Categories</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                    <div className="col-6 col-md-4 py-2 px-2 mx-auto my-auto">
                        <div className="text-center bg-white shadow-xl py-3 rounded-lg">
                        <Link to="#" className="no-underline  hover:text-zinc-600 active:text-zinc-500 text-zinc-500">
                        <div className="p-3">
                            <div className="icon mb-2">
                                <i className="fas fa-power-off fa-5x"></i>
                            </div>                            
                           <h2 className="title-font font-medium text-xl">Sell</h2>
                        </div>
                        </Link>
                        </div>                   
                    </div>

                </div>
            </div>
        </>
    )
}

export default Menu
