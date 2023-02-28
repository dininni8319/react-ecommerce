import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName}) => {
  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input 
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <button className='btn btn-outline-primary mt-3'>Save</button>
    </form>
  )
}

export default CategoryForm;