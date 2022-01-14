import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const ViewCategory = () => {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
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


    const getCategory = (e) => {
        e.preventDefault();
        e.persist();
        const data = {
            store_id: storeInput.store_id,
        };

        axios.post(`/api/view-category`, data).then(res =>{
            if (res.status === 200) {
                setCategoryList(res.data.category); 
            }
            setLoading(false);
        });
    };
    

     const deleteCategory = (e, id) => {
        e.preventDefault();
        e.persist();

        const thisClicked = e.currentTarget;
        // thisClicked.innerText = "Deleting";

    if (role === 'admin') {
    axios.delete(`/api/admin-delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                // thisClicked.closest("tr").remove();
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    } else if (role === 'owner'){
    axios.delete(`/api/delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                // thisClicked.closest("tr").remove();
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

        // axios.delete(`/api/delete-category/${id}`).then(res => {
        //     if (res.data.status === 200) {
        //         swal("Success",res.data.message,"success");
        //         thisClicked.closest("tr").remove();
        //     }else if (res.data.status === 404){
        //         swal("Error",res.data.message,"error");
        //         thisClicked.innerText = "Delete";
        //     }
        // });
    }


    var viewcategory = "";

        var CategoryStatus = '';
        viewcategory =
        categoryList.map((item) => {
            if (item.status == '1') {
                CategoryStatus = 'Shown'
            } else if (item.status == '0') {
                CategoryStatus = 'Hidden'
            }

            return (
                <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.stores.name}</td>
                <td>
                    {CategoryStatus}
                </td>
                    <td>
                    <Link to={`edit-category/${item.id}`} className='btn btn-warning btn-sm'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={ (e) => deleteCategory(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
                    </td>                
                </tr>
            );
        });

    return (
        <>
        <div className="container">
            <form onSubmit={getCategory}>
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
               <h4>Category List
               <Link className="btn btn-primary btn-sm float-end" to="/add-category">Add Category</Link>
               </h4>
           </div>

           <div className="card-body">
               <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Store Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewcategory}
                    </tbody>
                    </table>
           </div>
        </div>

        </div>

            
        </>
    )
}

export default ViewCategory