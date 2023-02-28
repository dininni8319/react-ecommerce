import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from './../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySub } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initial = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', "Brown", 'Silver', "White", "Blue"],
  brands: ['Apple', "Samsung", 'Microsoft', "Lenovo", "ASUS"],
  color: '',
  brand: '',
}

const ProductCreate = () => {
  const [ values, setValues ] = useState(initial);
  const { user } = useSelector(state => ({ ...state })); 
  const [ subOptions, setSubOptions ] = useState([]);
  const [ showSub, setShowSub ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    loadCategories();
  },[]);

  const loadCategories = () => 
    getCategories().then(cat => setValues({...values, categories: cat.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then(res => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.err)
      })
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log(values, '------', e.target.value);
    setValues({...values, subs: [], category: e.target.value });
    getCategorySub(e.target.value)
     .then(res => {
        setSubOptions(res.data);
     })
     setShowSub(true);
  }

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
         { loading ? <LoadingOutlined  className='text-danger h1'/> : <h4>Product create</h4> }
          <hr />
          
         <div className="p-3">
           <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
           />
         </div>
         <ProductCreateForm 
           handleChange={handleChange}
           handleSubmit={handleSubmit}
           handleCategoryChange={handleCategoryChange}
           values={values}
           setValues={setValues}
           showSub={showSub}
           subOptions={subOptions}
         />
        </div>
      </div>
    </div>
  )
}
 
export default ProductCreate;