import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const EditCategory = (props) => {

    const history = useHistory();


    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategoryInput] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const role = localStorage.getItem('role');


    // useEffect(() => {
    //     const category_id = props.match.params.id;

    //     axios.get(`api/edit-category/${category_id}`).then(res =>{
    //         if (res.data.status === 200) {
    //             setCategoryInput(res.data.category);
    //         } else if (res.data.status === 404){
    //             swal("Error", res.data.message, "error")
    //             history.push('/view-category');
    //         }
    //         setLoading(false);
    //     });
    // }, [props.match.params.id, history])


    useEffect(() => {
    const category_id = props.match.params.id;
    if (role === 'admin') {
        axios.get(`api/admin-edit-category/${category_id}`).then(res =>{
            if (res.data.status === 200) {
                setCategoryInput(res.data.category);
            } else if (res.data.status === 404){
                swal("Error", res.data.message, "error")
                history.push('/view-category');
            }
            setLoading(false);
        });
    } else if (role === 'owner'){
        axios.get(`api/edit-category/${category_id}`).then(res =>{
            if (res.data.status === 200) {
                setCategoryInput(res.data.category);
            } else if (res.data.status === 404){
                swal("Error", res.data.message, "error")
                history.push('/view-category');
            }
            setLoading(false);
        });
    }
    }, [props.match.params.id, history, role])

    useEffect(() => {
        axios.get(`/api/all-stores`).then(res => {
            if (res.status === 200) {
               setStoreList(res.data.store); 
            }
        });
    }, [])

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value})
    }

    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;

        const data = categoryInput;

        if (role === 'admin') {
        axios.put(`/api/admin-update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setErrors([]);
                history.push('/view-category');
            } else if (res.data.status === 422){
                swal("All fields are mandatory","","error");
                setErrors(res.data.validation_errors);
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                history.push('/view-category');
            }
        });
        } else if (role === 'owner'){
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message,"success");
                setErrors([]);
                history.push('/view-category');
            } else if (res.data.status === 422){
                swal("All fields are mandatory","","error");
                setErrors(res.data.validation_errors);
            }else if (res.data.status === 404){
                swal("Error",res.data.message,"error");
                history.push('/view-category');
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
        <div className="container px-4">
            <h1 className="mt-4">Edit Category
                <Link to="/view-category" className="btn btn-primary btn-sm float-end">Go Back</Link>
            </h1>

            <form onSubmit={updateCategory} id="updateCategory">

            <div className="tab-content" id='myTabContent'>                    
                        <div className="form-group mb-3">
                            <label htmlFor="slug">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control'/>
                            <span className="text-sm text-danger">{errors.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control'/>
                            <span className="text-sm text-danger">{errors.name}</span>
                        </div>
                        <div className="form-group mb-3">
                                    <label htmlFor="slug">Select store</label>
                                    <select name="store_id" onChange={handleInput} value={categoryInput.store_id}>
                                        <option>Select store</option>
                                        {storeList.map((item) => {
                                            return(
                                                <option key={item.id} value={item.id}>{item.name}</option>                                             
                                            )
                                        })}                                
                                    </select>
                                    <span className="text-sm text-danger">{errors.store_id}</span>
                        </div>
                    </div>
            <button type="submit" className="btn btn-primary float-end px-4">Update</button>
            </form>
        </div>
    )
}

export default EditCategory
