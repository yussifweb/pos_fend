import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const app_url = process.env.REACT_APP_URL;

const ProductList = (props) => {

    const history = useHistory;
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    // const [quantity, setQuantity] = useState(1)

    const productCount = productList.length;

    // const handleDecreament = ()=> {
    //     if (quantity > 1) {
    //         setQuantity(prevCount => prevCount - 1) 
    //     }
    // }

    // const handleIncreament = ()=> {
    //         if (quantity < 10) {
    //             setQuantity(prevCount => prevCount + 1) 
    //     }
    // }

    const submitToCart = (e, id) => {
        e.preventDefault();
        e.persist();
        
        const data = {
            product_id: id,
            product_qty: 1,
        }

        axios.post(`/api/add-to-cart`, data).then( res => {
            if (res.data.status === 201) {
                swal("Success",res.data.message,"success");
            } else if (res.data.status === 409){
                swal("Warning",res.data.message,"warning");
            } else if (res.data.status === 401){
                swal("Error",res.data.message,"error");
            }else if (res.data.status === 404){
                swal("Warning",res.data.message,"warning");
            }
        });
    }

    useEffect(() => {
        let isMounted = true;
    
        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchProducts/${product_slug}`).then(res => {
            if (isMounted) {
            if (res.data.status === 200) {
               setProductList(res.data.product_data.product); 
               setCategoryList(res.data.product_data.category); 
               setLoading(false);
            } else if (res.data.status === 400) {
                swal("Warning",res.data.message,"warning")
            } else if (res.data.status === 404) {
                setLoading(false);
                swal("Warning",res.data.message,"warning")
                history.push('/view-categories')
            }           
        }            
        });
        return () => {
            isMounted = false;
        }
        
    },[props.match.params.slug, history]);


    if (loading) {
       return (
           <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
       );
    } else {
        var showProductList = '';
        var inStock = '';

        if (productCount) {
        showProductList = productList.map((item, idx) => {

            if (item.qty > 0) {
                        inStock =
                        // <div className='container'>
                            <div className="row">
                                {/* <div className="col-sm-12 col-md-6 mt-2">
                                    <div className="input-group">
                                        <button type='button' onClick={(e) =>handleDecreament(e, item.id)} className="input-group-text btn-sm">-</button>
                                        <div className="form-control form-control-sm text-center">{quantity}</div>
                                        <button type='button' onClick={(e) =>handleIncreament(e, item.id)} className="input-group-text btn-sm">+</button>
                                    </div>
                                </div> */}
                                <div className="col-sm-12 col-md-12">
                                    <button type='button' className="btn-sm btn-primary w-100" onClick={ (e) => submitToCart(e, item.id)}>Add to Cart</button>
                                </div>
                                {/* <div className="col-md-12">
                                <button type='button' className="btn-sm btn-danger w-100 mt-2">Add to Wishlist</button>
                                </div> */}
                                 
                            </div>
                        // </div>
                    } else {
                        inStock =
                        // <div className='container'>
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <label htmlFor="" className="btn-sm btn-danger">Out of Stock</label>
                                </div>
                                {/* <div className="col-md-12">
                                <button type='button' className="btn-sm btn-danger mt-2">Add to Wishlist</button>
                                </div> */}
                            </div>
                        // </div> 
                        }

            return (
            <div className="col-md-3 p-2" key={idx}>
                <div className="card">
                    <div className="card-body" style={{marginBottom: "-25px"}}>
                        <span className="position-absolute top-0 start-0 translate-start badge rounded bg-green-700">
                            GH₵ {item.selling_price}
                            <span className="visually-hidden">Selling Price</span>
                        </span>
                        <Link to={`/productlist/${item.category.slug}/${item.slug}`}>
                            <img src={`${app_url}${item.image}`} className='w-100' alt={item.name} />
                        </Link>
                        <Link to={`/productlist/${item.category.slug}/${item.slug}`} className="nav-link">
                            <h6>{item.name}</h6>
                        </Link>
                        <p className="text-sm text-center">{item.qty} {item.unit} left</p>                     
                    </div>
                    <div className="card-footer">
                        {inStock}
                    </div>
                </div>
            </div>
            );
        });

        } else {
            showProductList = 
            <div className="col-12">
                <h4>No products available for {categoryList.name}</h4>
            </div>  
        }
    }

    return (
        <div>
            {/* <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Product List / {categoryList.name}</h6>
                </div>
            </div> */}


            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProductList