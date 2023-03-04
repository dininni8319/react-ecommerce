import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ProductUpdateForm = ({ 
  handleChange, 
  handleSubmit, 
  values,
  setValues,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSub,
  setArrayOfSub,
  selectedCategory
}) => {
  const { 
    title,
    description,
    price,
    images,
    subs,
    color,
    quantity,
    colors,
    brands,
    brand,
    category,
    shipping,
  } = values;

  return ( 
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Title</label>
      <input 
        type="text" 
        name='title' 
        className='form-control' 
        value={title}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Description</label>
      <input 
        type="text" 
        name='description' 
        className='form-control' 
        value={description}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Price</label>
      <input 
        type="number" 
        name='price' 
        className='form-control' 
        value={price}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Shipping</label>
      <select 
        name="shipping" 
        className="form-control"
        onChange={handleChange}
        value={shipping === "YES" ? "YES": "NO"}
      >
        <option value="NO">NO</option>
        <option value="YES">YES</option>
      </select>
    </div>

    <div className="form-group">
      <label>Quantity</label>
      <input 
        type="number" 
        name='quantity' 
        className='form-control' 
        value={quantity}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Color</label>
      <select 
        name="color" 
        className="form-control"
        onChange={handleChange}
        value={color}
      >
        <option>Please select</option>
        {colors && colors.map(color => <option key={color} value={color}>{color}</option>) || null}
      </select>
    </div>
    
    <div className="form-group">
      <label>Brand</label>
      <select 
        value={brand}
        name="brand" 
        className="form-control"
        onChange={handleChange}
      >
        <option>Please select</option>
        {brands && brands.map(brand => <option key={brand} value={brand}>{brand}</option>) || null}
      </select>
    </div>

    <div className="form-group">
      <label>Category</label>
      <select 
        name="category" 
        className='form-control'
        onChange={handleCategoryChange}
        value={selectedCategory ? selectedCategory : category._id}
      >

        {categories && categories?.map((cat) => {
            return (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            )
        })}
      </select>
    </div>

    <div>
      <label>Sub Categories</label>
      <Select
        mode="multiple"
        style={{width: '100%'}}
        placeholder='Please select'
        value={arrayOfSub}
        name='subs'
        onChange={(value) => setArrayOfSub(value)}
      >
        {subOptions?.map((sub) => {
          return <Option value={sub._id} key={sub._id}>{sub.name}</Option>
        })}
      </Select>
    </div>
    
    <button className="btn btn-outline-info">Save</button>
  </form>
   );
}
 
export default ProductUpdateForm;