import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct } from '../../../functions/product';
import ProductUpdateForm from './../../../components/forms/ProductUpdateForm';
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

const ProductUpdate = ({ match }) => {
  const { user } = useSelector(state => ({ ...state })); 
  const { slug } = match.params;
  const [ values, setValues ] = useState(initial);

  useEffect(() => {
    loadProduct()
  }, []);

  const loadProduct = () => {
    getProduct(slug)
    .then((product) => {
       setValues({ ...values, ...product.data })
    });
  }

  const handleSubmit = (e) => {
     e.preventDefault();
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {JSON.stringify(values)}
          <h4>Product Update</h4>
          <hr />
          <ProductUpdateForm
             handleChange={handleChange}
             handleSubmit={handleSubmit}
             values={values}
             setValues={setValues}
          />
        </div>
      </div>
    </div>
  )
}
 
export default ProductUpdate;