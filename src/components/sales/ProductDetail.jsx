import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';

const ProductDetail = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        let isMounted = true;
    
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
            if (res.data.status === 200) {
               setProductList(res.data.product); 
               setLoading(false);
            } else if (res.data.status === 404) {
                history.push('/productlist');
                swal("Warning",res.data.message,"warning");
            }           
        }            
        });
        return () => {
            isMounted = false;
        }
        
    },[props.match.params.category, props.match.params.product, history]);

    // const handleQuantity = (e) =>{
    // e.persist();
    // if (quantity < productList.qty) {
    //     setQuantity({...quantity, [e.target.name]: e.target.value});
    // }else{
    //     swal("Warning","Invalid Quantity!","warning");
    // }
    
    // };

    const handleDecreament = ()=> {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1) 
        }
    }

    const handleIncreament = ()=> {
            if (quantity < productList.qty) {
                setQuantity(prevCount => prevCount + 1)
        }
    }

    const submitToCart = (e) => {
        e.preventDefault();

        // if (quantity < productList.qty) {
        // swal("Warning","Invalid Quantity!","warning");
        // };

        const data = {
            product_id: productList.id,
            product_qty: quantity,
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


    if (loading) {
       return (
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       );
    }else{
        
        var inStock = '';

        if (productList.qty > 0) {
        inStock =
            <div className='container'>
                <label htmlFor="" className="btn-sm btn-success px-4 mt-2">In Stock</label>
                <div className="row">
                    <p className="text-center">{productList.qty} {productList.unit} left</p>
                    <div className="col-md-6 mt-2">
                        
                        <div className="input-group">
                            <button type='button' onClick={handleDecreament} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            {/* <input type="text" name="quantity" id="quantity" className="form-control text-center" onChange={handleQuantity} value={quantity} /> */}
                            <button type='button' onClick={handleIncreament} className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <button type='button' className="btn btn-primary w-100" onClick={submitToCart}>Add to Cart</button>
                    </div>
                    {/* <button type='button' className="btn btn-danger mt-3">Add to Wishlist</button>  */}

                </div>
            </div>
        }else{
           inStock =
            <div className='container'>
                <div className="row">
                    <div className="col-md-8">
                        <label htmlFor="" className="btn-sm btn-danger px-4 mt-2">Out of Stock</label>
                    </div>
                    {/* <button type='button' className="btn btn-danger mt-3">Add to Wishlist</button> */}
                </div>
            </div> 
        }
    }

    return (
        <>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Products / {productList.category.name} / {productList.name}</h6>
                </div>
            </div>

                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`http://localhost:8000/${productList.image}`} alt={productList.name} />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                <span className="float-end badge btn-sm btn-danger badge-pill">{productList.brand}</span>
                            </h4>
                            <p>{productList.name}</p>
                            <p>{productList.description}</p>
                            <h4 className="mb-1">
                                {productList.selling_price}
                                <s className='ms-2'>{productList.original_price}</s>
                            </h4>
                            {inStock}
                        </div>
                              
                    </div>
                </div>
            
        </>
    );
}

export default ProductDetail