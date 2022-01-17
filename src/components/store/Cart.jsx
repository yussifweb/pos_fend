import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Cart = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cartList, setCartList] = useState([]);
    var totalCartPrice = 0;


    const handleDecreament = (cart_id)=> {
        setCartList(cart => 
            cartList.map((item) =>
                cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1:0)} : item
            ));
        updateCartQuantity(cart_id, 'dec');
    }

    const handleIncreament = (cart_id)=> {
        setCartList(cart => 
            cartList.map((item) =>
                cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1:0)} : item
            ));
        updateCartQuantity(cart_id, 'inc');
    }

    const updateCartQuantity = (cart_id,scope) => {
        axios.put(`/api/update-cartquantity/${cart_id}/${scope}`).then(res =>{
            if (res.data.status === 200) {
                // swal("Success",res.data.message,"success");
            }
        })
    }

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res =>{
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }else if (res.data.status === 404) {
                swal("Warning",res.data.message,"warning");
                thisClicked.innerText = "Remove";
            }
        })
    }

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Warning","Login to go to cart","error");
    }

        useEffect(() => {
        let isMounted = true;
    
        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
            if (res.data.status === 200) {
               setCartList(res.data.cart); 
               setLoading(false);
            }  else if (res.data.status === 401) {
                history.push('/');
                swal("Warning",res.data.message,"warning");
            }           
        }            
        });
        return () => {
            isMounted = false;
        }
        
    },[history]);


    if (loading) {
       return (
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       );
    }

    var cart_HTML = '';
    
    if (cartList.length > 0) {
        cart_HTML = 
                <div>
               <table className="table table-dark table-striped table-responsive">
                    <thead>
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList.map((item, idx) =>{
                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return (
                        <tr key={idx}>
                        <td><img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} className="rounded-circle" width="50px" /></td>

                        <td>{item.product.name}</td>

                        <td>
                            <div className="input-group">
                            <button type='button' onClick={() => handleDecreament(item.id)} className="input-group-text">-</button>
                            <div className="form-control text-center">
                                {/* {quantity} */}
                                {item.product_qty}
                            </div>
                            <button type='button' onClick={() => handleIncreament(item.id)} className="input-group-text">+</button>
                        </div>
                        </td>

                        <td>{item.product.selling_price * item.product_qty}</td>

                        <td>
                            <button onClick={(e) => deleteCartItem(e, item.id)} className='btn btn-danger btn-sm'>Remove</button>
                        </td>
                        </tr>
                        )
                        })}
                    </tbody>
                    </table>

                    <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <div className="card card-body mt-3">
                        <h4>Sub Total: 
                            <span className='float-end'>{totalCartPrice}</span>
                        </h4>
                        <h4>Grand Total: 
                            <span className='float-end'>{totalCartPrice}</span>
                        </h4>
                        <hr />
                        <Link to="/checkout" className="btn btn-primary">Checkout</Link>
                        </div>
                    </div>

                    </div>
                    </div>
    }else{
        cart_HTML =
        <h6>Nothing in cart</h6>
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div>


            <div className="py-4">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        {cart_HTML}
                    </div>

            </div>
            </div>
            </div>
        </div>
    )
}

export default Cart