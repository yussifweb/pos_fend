import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const ProductList = (props) => {

    const history = useHistory;
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);


    const productCount = productList.length;


    const submitToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: productList.id,
            // product_qty: quantity,
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
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       );
    }else{
        var showProductList = '';

        if (productCount) {
        showProductList = productList.map((item, idx) => {
            return (
            <div className="col-md-3" key={idx}>
                <div className="card">
                    <div className="card-body">
                        <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                            <img src={`http://localhost:8000/${item.image}`} className='w-100' alt={item.name} />
                        </Link>
                        <Link to={`/collections/${item.category.slug}/${item.slug}`} className="nav-link">
                            <h6>{item.name}</h6>
                        </Link>                        
                    </div>
                    <div className="card-footer">
                        <button type='button' className="btn btn-primary w-100" onClick={submitToCart}>Add to Cart</button>
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
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Product List / {categoryList.name}</h6>
                </div>
            </div>


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