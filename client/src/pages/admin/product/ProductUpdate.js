import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySub } from '../../../functions/category'
import ProductUpdateForm from './../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initial = {
  title: '',
  description: '',
  price: '',
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

const ProductUpdate = ({ match, history }) => {
  const { user } = useSelector(state => ({ ...state })); 
  const { slug } = match.params;
  const [ values, setValues ] = useState(initial);
  const [subOptions, setSubOptions ] = useState([]);
  const [categories, setCategories ] = useState([]);
  const [ arrayOfSub, setArrayOfSub ] = useState([])
  const [ selectedCategory, setSelectedCategory ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((product) => {
      // console.log("single product", product);
      // 1 load single product 
      setValues({ ...values, ...product.data });
      // 2 load single product category subs
      getCategorySub(product.data.category._id)
       .then((res) => {
         setSubOptions(res.data);
       })
      // 3 prepare array of sub ids to show as default sub value in antd design select
      let arr = [];
      product.data.subs.map(sub => {
        arr.push(sub._id);
      });
      setArrayOfSub(prev => arr); // required for antd to work
    });
  };

  const loadCategories = () => 
    getCategories()
      .then(cat => setCategories(cat.data));


  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     values.subs = arrayOfSub;
     values.category = selectedCategory ? selectedCategory : values.category; 

     updateProduct(slug, values, user.token)
      .then(res => {
         setLoading(true);
         toast.success(`"${res.data.title} is updated"`);
         history.push('/admin/products');
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log(values, '------', e.target.value);
    setValues({...values, subs: [] });

    setSelectedCategory(e.target.value)
    getCategorySub(e.target.value)
     .then(res => {
        setSubOptions(res.data);
     });

     // if the user clicks back the original category 
     // show its sub category default
     if (values.category._id === e.target.value) {
       loadProduct();
     }
     setArrayOfSub([])
  }

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {/* {JSON.stringify(values)} */}
          <div className="p-3">
          { loading ? <LoadingOutlined  className='text-danger h1'/> : <h4>Product update</h4> }
           <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
           />
         </div>
 
          <ProductUpdateForm
             handleChange={handleChange}
             handleSubmit={handleSubmit}
             values={values}
             setValues={setValues}
             categories={categories}
             subOptions={subOptions}
             arrayOfSub={arrayOfSub}
             setArrayOfSub={setArrayOfSub}
             handleCategoryChange={handleCategoryChange}
             selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  )
}
 
export default ProductUpdate;