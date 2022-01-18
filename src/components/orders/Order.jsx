import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Order = () => {
    const history = useHistory;
    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);

    const orderCount = orderList.length;

    useEffect(() => {
        let isMounted = true;
        document.title = "Orders";
    
        axios.get(`/api/orders`).then(res => {
            if (isMounted) {
            if (res.data.status === 200) {
               setOrderList(res.data.orders); 
               setLoading(false);
            }          
        }            
        });
        return () => {
            isMounted = false;
        }
        
    },[]);


    if (loading) {
       return (
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       );
    }else{
        var showOrderList = '';

        if (orderCount) {
        showOrderList = orderList.map((item, idx) => {
            return (
                <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.tracking_no}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                    <Link to={`view-order/${item.id}`} className='btn btn-success btn-sm'>View</Link>
                </td>
                </tr>
            );
        });
        } else {
            showOrderList = 
            <div className="col-12">
                <h4>No Orders available</h4>
            </div>  
        }
    }

    return (
        <div className="container">
        <div className='card mt-4'>
            <div className="card-header">
               <h4>Orders</h4>
           </div>
           <div className="card-body">
               <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tracking No</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showOrderList}
                    </tbody>
                    </table>
           </div>
        </div>

        </div>
    )
}

export default Order