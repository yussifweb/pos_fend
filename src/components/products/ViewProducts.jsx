import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const app_url = process.env.REACT_APP_URL

const ViewProducts = () => {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [storeInput, setStoreInput] = useState([]);
    const role = localStorage.getItem('role');

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store);
            }
        });
    }, [])

    const handleInput = (e) =>{
    e.persist();
    setStoreInput({...storeInput, [e.target.name]: e.target.value});
    };


    const getStore = (e) => {
        e.preventDefault();
        e.persist();
        const data = {
            store_id: storeInput.store_id,
        };

        axios.post(`/api/view-products`, data).then(res =>{
            if (res.status === 200) {
                setProductList(res.data.products); 
            }
            setLoading(false);
        });
    };
    

     const deleteProduct = (e, id) => {
        e.preventDefault();
        e.persist();

        const thisClicked = e.currentTarget;
        // thisClicked.innerText = "Deleting";

    if (role === 'admin') {
    axios.delete(`/api/admin-delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                // thisClicked.closest("tr").remove();
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    } else if (role === 'owner'){
    axios.delete(`/api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                // thisClicked.closest("tr").remove();
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
        }
    }


    var viewproduct = "";

        var ProductStatus = '';
        
        viewproduct =
        productList.map((item) => {
            if (item.status == '1') {
                ProductStatus = 'Shown'
            } else if (item.status == '0') {
                ProductStatus = 'Hidden'
            }

            var CategoryName = '';
            if (item.category_id == 0) {
                CategoryName = 'Uncategorized';
            }else{
                CategoryName = item.category.name;
            } 

            

            return (
                <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.store.name}</td>
                <td>{CategoryName}</td>          
                <td>
                    {ProductStatus}
                </td>
                    <td>
                    <Link to={`edit-product/${item.id}`} className='btn btn-warning btn-sm'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={ (e) => deleteProduct(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
                    </td>                
                </tr>
            );
        });

    return (
        <>
        <div className="container">
            <form onSubmit={getStore}>
                    <div className="form-group mb-3">
                        <label htmlFor="slug">Select store</label>
                        <select name="store_id" onChange={handleInput} value={storeInput.store_id}>
                            <option>Select store</option>
                            {storeList.map((item) => {
                                return(
                                    <option key={item.id} value={item.id}>{item.name}</option>                                                
                                )
                            })}                                
                        </select>
                        <button type="submit" className='btn btn-success'>Get</button>
                    </div>
                </form>
        <div className='card mt-4'>
            <div className="card-header">
               <h4>Product List
               <Link className="btn btn-primary btn-sm float-end" to="/add-product">Add Product</Link>
               </h4>
           </div>

           <div className="card-body">
               <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Store Name</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewproduct}
                    </tbody>
                    </table>
           </div>
        </div>

        </div>

            
        </>
    )
}

export default ViewProducts