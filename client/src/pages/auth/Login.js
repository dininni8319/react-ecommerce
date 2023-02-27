import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  let dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  };

  useEffect(() => {
    if (user && user.token) history.push('/');
  },[user])

  const handleSubmit = async (e) => {
    //prevent browser from reload
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await auth.signInWithEmailAndPassword(email,password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
     
      createOrUpdateUser(idTokenResult.token)
        .then((res) => { 
       
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          roleBasedRedirect(res);
        })
        .catch(err => console.log(err));
    } catch (error) {
     toast.error(error.message);
     setLoading(false);
   }
  };

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => { 
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });

            roleBasedRedirect(res);
          })

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
  };

  const loginForm = () => <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="email" 
          className='form-control' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          autoFocus
        />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          className='form-control' 
          value={password} 
          placeholder='Your password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
     <Button
       onClick={handleSubmit}
       type='primary'
       className='mb-3'
       block
       shape='round'
       icon={<MailOutlined />}
       size='large'
       disabled={!email || password.length < 6}
     >Login with Email/Password</Button> 
  </form>;

  return ( ///emit plogin
    <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              {loading ? (
                  <h4 className='text-danger'>Loading...</h4>    
              ) : ( <h4>Login</h4>)}
              {loginForm()}
              <Button
                onClick={googleLogin}
                type='danger'
                className='mb-3'
                block
                shape='round'
                icon={<GoogleOutlined />}
                size='large'
              >Login with Google</Button> 
            <Link to='/forgot/password' className='float-right text-danger'>Forgot Password</Link>
          </div>
        </div>
    </div>
  )
}

export default Login;