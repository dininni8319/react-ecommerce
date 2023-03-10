import axios from 'axios';

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product/`, product, 
    {
      headers: {
        authtoken,
      }
    }
  );
};

export const getProductsByCount = async (count) => 
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProduct = async (slug) => 
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const removeProduct = async (slug,authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, 
    {
      headers: {
        authtoken,
      }
    }
  );
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, 
    {
      headers: {
        authtoken,
      }
    }
  );
};
