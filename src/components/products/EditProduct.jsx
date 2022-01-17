import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

const EditProduct = (props) => {

    const history = useHistory();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const role = localStorage.getItem('role') 

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
    
    const [error, setError] = useState([]);

    
    const [categoryList, setCategoryList] = useState([]);
    const [image, setImage] = useState([]);
    const [productInput, setProductInput] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
    });

    const [storeList, setStoreList] = useState([]);
    const [categoryInput, setCategoryInput] = useState([]);
    const [storeInput, setStoreInput] = useState([]);
    const [allcheckbox, setAllCheckboxes] = useState([]);


    const handleInput = (e) => {
        e.persist();
        setProductInput({...productInput, [e.target.name]: e.target.value})
    }

    const handleImage = (e) => {
        e.persist();
        setImage({image: e.target.files[0]})
    }

    const handleCategoryInput = (e) => {
        e.persist();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleStoreInput = (e) =>{
    e.persist();
    setStoreInput({...storeInput, [e.target.name]: e.target.value});
    };

    const handleCheckbox = (e) => {
        e.persist();
        setAllCheckboxes({...allcheckbox, [e.target.name]: e.target.checked})
        console.log(allcheckbox.status);
    }


    useEffect(() => {
        const product_id = props.match.params.id;

        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if (res.data.status === 200) {
               setProductInput(res.data.product);
               setAllCheckboxes(res.data.product);
               setCategoryInput(res.data.product);
               setStoreInput(res.data.product);
            } else if(res.data.status === 404) {
                swal("Error",res.data.message,"error");
                history.push('/view-product');
            }

            setLoading(false);
        });

    }, [props.match.params.id, history]);

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store); 
            }
        });
    }, []);

    useEffect(() => {
        const sid = storeInput.store_id;
        axios.get(`/api/product-view-category/${sid}`).then(res =>{
            if (res.status === 200) {
                setCategoryList(res.data.category); 
            }
            setLoading(false);
        });
    }, [storeInput.store_id]);


     const updateProduct = (e) => {
        e.preventDefault();

        const product_id = props.match.params.id;

        const formData = new FormData();

        formData.append('image', image.image);

        formData.append('store_id', storeInput.store_id);
        formData.append('category_id', categoryInput.category_id);
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
        axios.post(`/api/admin-update-product/${product_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/view-products');
            } else if (res.data.status === 422){
                swal("All fields are mandatory","","error");
                setError(res.data.validation_errors);
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                history.push('/view-products');
            }
        });
        } else if (role === 'owner'){
        axios.post(`/api/update-product/${product_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/view-products');
            } else if (res.data.status === 422){
                swal("All fields are mandatory","","error");
                setError(res.data.validation_errors);
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                history.push('/view-products');
            }
        });
        }
    }

    if (loading) {
       return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
            </div>
        </div>
       );
    }

    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                <div className="card-header">
                <h4>Edit Product 
                    <Link className="btn btn-primary btn-sm float-end" to="/view-product">View Product</Link>
               </h4>
                </div>
                <div className="card-body">
                <form encType="multipart/form-dat" onSubmit={updateProduct} id="addProduct">
                            <div className="form-group mb-3">
                                <label htmlFor="slug">Select store</label>
                                <select name="store_id" onChange={handleStoreInput} value={storeInput.store_id}>
                                    <option>Select store</option>
                                    {/* <option defaultValue={productInput.store_id}>{productInput.store.name}</option> */}
                                    {storeList.map((item) => {
                                        return(
                                            <option key={item.id} value={item.id }>{item.name}</option>                                                
                                        )
                                    })}                                
                                </select>
                                <span className="text-sm text-danger">{error.store_id}</span>
                            </div>
                        
                        <div className="form-group mb-3">
                            <label htmlFor="slug">Select Category</label>
                            <select name="category_id" onChange={handleCategoryInput} value={categoryInput.category_id}>
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
                            <textarea name="description" cols="10" rows="5" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
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
                            <img src={`http://localhost:8000/${productInput.image}`} alt={productInput.name} width="50px" />
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label htmlFor="status" className='mr-3'>Status (Checked=Shown)</label>
                            <input type="checkbox" name="status" className="w-50 h-50" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? '1':'0'} />
                        </div>
                    </div>

                <button type="submit" className="btn btn-primary float-end px-4">Update Product</button>
            </form>
    
            </div>
            </div>
        </div>

    )
}

export default EditProduct;