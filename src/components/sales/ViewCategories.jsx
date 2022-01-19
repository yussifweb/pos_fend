import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ViewCategories = () => {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [storeInput, setStoreInput] = useState([]);

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store);
            }
        });
    }, [])

    // const handleInput = (e) =>{
    // e.persist();
    // setStoreInput({...storeInput, [e.target.name]: e.target.value});
    // };


    // const getCategory = (e) => {
    //     e.preventDefault();
    //     e.persist();
    //     const data = {
    //         store_id: storeInput.store_id,
    //     };

    //     axios.post(`/api/view-category`, data).then(res =>{
    //         if (res.status === 200) {
    //             setCategoryList(res.data.category); 
    //         }
    //         setLoading(false);
    //     });
    // };

    useEffect(() => {
        document.title = "Categories";
        let isMounted = true;
        const sid = localStorage.getItem('currentStore');
        axios.get(`/api/product-view-category/${sid}`).then(res => {
            if (isMounted) {
            if (res.status === 200) {
               setCategoryList(res.data.category); 
               setLoading(false);
            }            
        }            
        });
        return () => {
            isMounted = false;
        }        
    }, []);


    //     if (loading) {
    //    return (
    //         <div className="spinner-border text-success" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //         </div>
    //    );
    // }else{
    //     var showCategoryList = '';
    //     showCategoryList = 


    //         );
    //     });
    // }


    return (
        <div>
            {/* <form onSubmit={getCategory}> */}
                    {/* <div className="form-group mb-3">
                        <label htmlFor="slug">Select store</label>
                        <select name="store_id" onChange={handleInput} value={storeInput.store_id}>
                            <option>Select store</option>
                            {storeList.map((item) => {
                                return(
                                    <option key={item.id} value={item.id}>{item.name}</option>                                                
                                )
                            })}                                
                        </select> */}
                        {/* <button type="submit" className='btn btn-success'>Get</button> */}
                    {/* </div> */}
                {/* </form> */}


            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {categoryList.map((item, idx) => {
                        return (
                        <div className="col-md-4" key={idx}>
                            <div className="card">
                                <div className="card-body">
                                    <Link to="">
                                        <img src="" className='w-100' alt="" />
                                    </Link>
                                    <Link to={`productlist/${item.slug}`} className="nav-link">
                                        <h6>{item.name}</h6>
                                    </Link>                                    
                                </div>
                            </div>
                        </div>
                        )
                        })}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ViewCategories
