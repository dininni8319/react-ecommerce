import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  getSub,  
  updateSub,
} from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ history, match }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [ name, setName ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ categories, setCategories ] = useState([]);  
  const [ parent, setParent ] = useState('');

  useEffect(() => {
    loadCategories();
    loadSub();
  },[]);

  const loadCategories = () => 
    getCategories().then(cat => setCategories(cat.data));

  const loadSub = () => 
    getSub(match.params.slug).then(sub => {
      setName(sub.data.name);
      setParent(sub.data.parent)
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
    .then(res => {
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is updated`);
      history.push('/admin/sub');
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      if(err.response.status === 400) toast.error(err.response.data)
    })
  }

  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
        { loading ? 
          (<h4 className='text-danger'>Loading...</h4>) :
          (<h4>Update sub category</h4>)
        } 
         <div className="form-group">
            <label>Parent category</label>
            <select 
              name="category" 
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 && categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id} selected={cat._id === parent}>
                      {cat.name}
                    </option>
                  )
              })}
            </select>
         </div>

          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div> 
   );
}
 
export default SubUpdate;
