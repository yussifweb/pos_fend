import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const app_url = process.env.REACT_APP_URL;

const ViewStores = () => {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [storeList, setStoreList] = useState([]);
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

    const deleteStore = (e, store_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";
        if (role === 'admin') {
        axios.delete(`/api/admin-delete-store/${store_id}`).then(res =>{
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }else if (res.data.status === 404) {
                swal("Warning",res.data.message,"warning");
                thisClicked.innerText = "Remove";
            }
        })
        } else if (role === 'owner'){   
        axios.delete(`/api/delete-store/${store_id}`).then(res =>{
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }else if (res.data.status === 404) {
                swal("Warning",res.data.message,"warning");
                thisClicked.innerText = "Remove";
            }
        });
        }
    }


    useEffect(() => {
        document.title = "Home / Stores";
        const title = "Home / Stores";
        
        let isMounted = true;
        if (isMounted) {            
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store); 
                setLoading(false);
            }  else if (res.data.status === 401) {
                history.push('/');
                swal("Warning",res.data.message,"warning");
            }    
        });
        }

        return () => {
            isMounted = false;
        }
    }, [history])


    if (loading) {
       return (
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       );
    }

    var stores = '';
    
    if (storeList.length > 0) {
        stores = 
                <div>
               <table className="table table-dark table-striped table-responsive">
                    <thead>
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Store Name</th>
                        <th scope="col">User</th>
                        <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeList.map((item, idx) =>{
                            return (
                        <tr key={idx}>
                        <td><img src={`${app_url}${item.image}`} alt={item.name} className="rounded-circle" width="30px" /></td>

                        <td>{item.name}</td>

                        <td>{item.user.name}</td>

                        <td>
                            <button onClick={(e) => deleteStore(e, item.id)} className='btn btn-danger btn-sm'>Remove</button>
                        </td>
                        </tr>
                        )
                        })}
                    </tbody>
                    </table>
                    </div>
    }else{
        stores =
        <h6>No store yet</h6>
    }

    return (
        <div>
            <div className="py-4">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        {stores}
                    </div>

            </div>
            </div>
            </div>
        </div>
    )
}

export default ViewStores