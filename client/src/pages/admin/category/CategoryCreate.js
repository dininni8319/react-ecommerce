import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  createCategory, 
  getCategories, 
  removeCategory 
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [ name, setName ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ categories, setCategories ] = useState([]); 
  
  useEffect(() => {
    loadCategories()
  },[]);

  const loadCategories = () => 
  getCategories().then(cat => setCategories(cat.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({name}, user.token)
    .then(res => {
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is created`)
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      if(err.response.status === 400) toast.error(err.response.data)
    })
  }
  const categoryForm = () => {
   return <form onSubmit={handleSubmit}>
     <label htmlFor="">Name</label>
     <input 
       type="text"
       className="form-control"
       value={name}
       onChange={(e) => setName(e.target.value)}
       required
       autoFocus
    />
    <button className='btn btn-outline-primary'>Save</button>
   </form>
  }
  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
        {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create category</h4>} 
          {categoryForm()}
          <hr />
          {/* {JSON.stringify(categories)} */}
          {categories.map((cat) => (
            <div  
             className='alert alert-secondary'
             key={cat._id}>
             {cat.name} 
             <span className='btn btn-sm float-right'>
                <DeleteOutlined  className='text-danger'/>
              </span> 
              <Link to={`/admin/category/${cat.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-warning'/>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div> 
   );
}
 
export default CategoryCreate;