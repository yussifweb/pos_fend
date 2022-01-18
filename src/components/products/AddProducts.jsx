import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const AddProduct = () => {

    const history = useHistory();

    const [productInput, setProductInput] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        status: ''
    });

    const [image, setImage] = useState([])
    const [error, setError] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [isMounted, setIsMounted] = useState(false)
    const [storeList, setStoreList] = useState([]);
    const [storeInput, setStoreInput] = useState([]);
    const [allcheckbox, setAllCheckboxes] = useState([])
    const [Authenticated, setAuthenticated] = useState(false);

    const role = localStorage.getItem('role');

    useEffect(() => {
    if(role === 'admin') {
        axios.get(`/api/checkingAuthenticated`).then(res =>{
                if (res.status === 200) {
                setAuthenticated(true); 
                }
                setLoading(false);
            });
    } else if (role === 'owner') {
        axios.get(`/api/checkingAuthenticatedOwner`).then(res =>{
                if (res.status === 200) {
                setAuthenticated(true); 
                }
                setLoading(false);
            });
        }else if (role === '') {
            swal("Access Denied", "You're not an Admin/Store Owner", "warning");
            history.push('/403');
            setLoading(false);
        }
            return () => {
            setAuthenticated(false);
            };
    }, [role, history]);

    const handleInput = (e) => {
        e.persist();
        setProductInput({...productInput, [e.target.name]: e.target.value})
    }

    const handleCheckbox = (e) => {
        e.persist();
        setAllCheckboxes({...allcheckbox, [e.target.name]: e.target.checked})
        console.log(allcheckbox.status);
    }

    const handleStoreInput = (e) =>{
    e.persist();
    setStoreInput({...storeInput, [e.target.name]: e.target.value});
    };

    const handleImage = (e) => {
        e.persist();
        setImage({image: e.target.files[0]})
    }

     const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image.image);

        formData.append('store_id', storeInput.store_id);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('brand', productInput.brand);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('unit', productInput.unit);
        formData.append('status', allcheckbox.status ? '1':'0');

    if (role === 'admin') {
        axios.post(`/api/admin-store-product`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setProductInput({...productInput,
                category_id: '',
                slug: '',
                name: '',
                description: '',

                selling_price: '',
                original_price: '',
                qty: '',
                brand: '',
            });
                setError([]);
                document.getElementById('addCategory').reset();
            } else if (res.data.status === 422){
                swal("All Fields are mandatory","","error");
                setError(res.data.validation_errors);
                // setProductInput({...productInput, error_list:res.data.validation_errors});
            }
        });
    } else if (role === 'owner'){
        axios.post(`/api/store-product`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setProductInput({...productInput,
                category_id: '',
                slug: '',
                name: '',
                description: '',

                selling_price: '',
                original_price: '',
                qty: '',
                brand: '',
            });
                setError([]);
                document.getElementById('addCategory').reset();
            } else if (res.data.status === 422){
                swal("All Fields are mandatory","","error");
                setError(res.data.validation_errors);
                // setProductInput({...productInput, error_list:res.data.validation_errors});
            }
        });  
    }

    }

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store);
            }
        });
    }, []);

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
    //         setloading(false);
    //     });
    // };

    useEffect(() => {
        let isMounted = true;
        const sid = storeInput.store_id;
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
    }, [storeInput.store_id]);

    // useEffect(() => {
    //     axios.get(`/api/all-category`).then(res => {
    //         if (res.status === 200) {
    //            setCategoryList(res.data.category); 
    //         }
    //     });
    // }, [])

    if (loading) {
       return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
        text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5
                37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53
                0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5
                37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92
                65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
            </svg>
            loading
        </button>
        </div>
       );
    }


    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                
                <div className="card-header">
                <h4>Add Product
                    <Link className="btn btn-primary btn-sm float-end" to="/view-products">View Product</Link>
               </h4>
                </div>
                <div className="card-body">
                <form encType="multipart/form-data" onSubmit={submitProduct} id="addProduct">
                    {/* <form onSubmit={getCategory}> */}
                    <div className="form-group mb-3">
                        <label htmlFor="slug">Select store</label>
                        <select name="store_id" onChange={handleStoreInput} value={storeInput.store_id}>
                            <option>Select store</option>
                            {storeList.map((item) => {
                                return(
                                    <option key={item.id} value={item.id}>{item.name}</option>                                                
                                )
                            })}                                
                        </select>
                        {/* <button type="submit" className='btn btn-success'>Get</button> */}
                    </div>
                {/* </form> */}

                        <div className="form-group mb-3">
                            <label htmlFor="slug">Select Category</label>
                            <select name="category_id" onChange={handleInput} value={productInput.category_id}>
                                <option>Select Category</option>
                                <option value="0">Uncategorized</option>
                                {categoryList.map((item) => {
                                    return(
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })}                                
                            </select>
                            <span className="text-sm text-danger">{error.category_id}</span>
                        </div>
                         <div className="form-group mb-3">
                            <label htmlFor="slug">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className='form-control'/>
                            <span className="text-sm text-danger">{error.slug}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control'/>
                            <span className="text-sm text-danger">{error.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" cols="15" rows="5" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                        </div>

                    <div className="row">
                        <div className="col-md-3 form-group mb-3">
                            <label htmlFor="selling_price">Selling Price</label>
                            <input type="text" name="selling_price" className='form-control' onChange={handleInput} value={productInput.selling_price} />
                            <span className="text-sm text-danger">{error.selling_price}</span>
                        </div>
                        <div className="col-md-3 form-group mb-3">
                            <label htmlFor="original_price">Original Price</label>
                            <input type="text" name="original_price" className='form-control' onChange={handleInput} value={productInput.original_price} />
                            <span className="text-sm text-danger">{error.original_price}</span>
                        </div>
                        <div className="col-md-3 form-group mb-3">
                            <label htmlFor="qty">Quantity</label>
                            <input type="text" name="qty" className='form-control' onChange={handleInput} value={productInput.qty} />
                            <span className="text-sm text-danger">{error.qty}</span>
                        </div>
                        <div className="col-md-3 form-group mb-3">
                            <label htmlFor="unit">Unit</label>
                            <input type="text" name="unit" className='form-control' onChange={handleInput} value={productInput.unit} />
                            <span className="text-sm text-danger">{error.unit}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" className='form-control' onChange={handleInput} value={productInput.brand} />
                            <span className="text-sm text-danger">{error.brand}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" className='form-control' onChange={handleImage} />
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label htmlFor="status" className='mr-3'>Status (Checked=Shown)</label>
                            <input type="checkbox" name="status" className="w-50 h-50" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false}  />
                        </div>
                </div>
            <button type="submit" className="btn btn-primary float-end px-4">Add Product</button>
            </form>
            </div>

            </div>
        </div>
    )
}

export default AddProduct