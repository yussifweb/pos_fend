import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Checkout = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cartList, setCartList] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',

    });

    const [error, setError] = useState([])

    const handleInput = (e) => {
        e.persist();

        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value})
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zipcode: checkoutInput.zipcode,
        }

        axios.post(`/api/place-order`, data).then(res => {
            if (res.data.status === 200) {
                swal("Sale Made Succesfully",res.data.message,"success");
                setError([]); 
                history.push('/thank-you');
            }  else if (res.data.status === 422) {
                swal("All fields are mandatory","","warning");
                setError(res.data.errors)
            }
        })
    }

    var totalCartPrice = 0;


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


    var checkout_HTML = '';
    
    if (cartList.length > 0) {
        checkout_HTML = <div>
        <div className="row">
        <div className="col-md-7">
            <div className="card">
                <div className="card-header">
                    <h4>Basic Informaton</h4>
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-md-6">                            
                            <div className="form-group mb-3">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                <small className="text-danger">{error.firstname}</small>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                <small className="text-danger">{error.lastname}</small>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="">Phone Number</label>
                                <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                <small className="text-danger">{error.phone}</small>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                <small className="text-danger">{error.email}</small>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label htmlFor="">Full Address</label>
                                <textarea type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                <small className="text-danger">{error.address}</small>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="">City</label>
                                <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                <small className="text-danger">{error.city}</small>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="">State</label>
                                <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                <small className="text-danger">{error.state}</small>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="">Zip Code</label>
                                <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                <small className="text-danger">{error.zipcode}</small>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group text-end">
                                <button type="button" onClick={submitOrder} className="btn btn-primary">Sell</button>
                                {/* <button type="button" onClick={ (e) => submitOrder(e, 'razorpay')} className="btn btn-secondary">Pay Online</button> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-5">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th width="50%">Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList.map((item, idx) =>{
                        totalCartPrice += item.product.selling_price * item.product_qty;
                            return (
                        <tr key={idx}>
                        <td>{item.product.name}</td>
                        <td>{item.product.selling_price}</td>
                        <td>{item.product_qty}</td>
                        <td>{item.product.selling_price * item.product_qty}</td>
                    </tr>
                    )})}
                    <tr>
                        <td colSpan="2" className='text-end fw-bold'>Grand Total</td>
                        <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        </div>

    }else{
        checkout_HTML =
        <h6>Nothing in cart</h6>
    }


    return (
        <>
        <div className="py-3 bg-warning">
            <div className="container">
                <h6>Home / Checkout</h6>
            </div>
        </div>


        <div className="py-4">
        <div className="container">
            {checkout_HTML}
        </div>
        </div>
        </>
    )
}

export default Checkout