import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({ 
  handleChange, 
  handleSubmit, 
  handleCategoryChange, 
  values,
  showSub,
  subOptions,
  setValues,
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
    categories,
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
      >
        <option>Please select</option>
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
        value={color}
        name="color" 
        className="form-control"
        onChange={handleChange}
      >
        {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
        ))}
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
        {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>Category</label>
      <select 
        name="category" 
        className='form-control'
        onChange={handleCategoryChange}
      >
        <option>Please select</option>
        {categories && categories?.map((cat) => {
            return (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            )
        })}
      </select>
      <br />

        {showSub && (
          <>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder='Please select'
              value={subs}
              name='subs'
              onChange={(value) => setValues({...values, subs: value})}
            >
              {subOptions?.map((sub) => {
                return <Option value={sub._id} key={sub._id}>{sub.name}</Option>
              })}
            </Select>
          </>
        )}
    </div>
    <button className="btn btn-outline-info">Save</button>
  </form>
   );
}
 
export default ProductCreateForm;