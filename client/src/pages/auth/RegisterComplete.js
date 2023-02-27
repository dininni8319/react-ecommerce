import React, { useState, useEffect } from "react";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  let dispatch = useDispatch();

  // const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email || !password) {
      toast.error("email and password is required");
      return;
    }

    if (password.length < 6 ) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    try {
      const result = await auth.signInWithEmailLink(
        email, 
        window.location.href
      );
      // console.log("RSULT", result);
      if (result.user.emailVerified) {
        //remove user email from the localStorage
        //get the user token
        //redirect
        //redux store
        window.localStorage.removeItem('emailForRegistration');

        let user = auth.currentUser;
        await user.updatePassword(password);
        //token to access our backend 
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
        })
        .catch();

        history.push('/');
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  };

  const completeRegistrationForn = () => <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        className='form-control' 
        value={email} 
        autoFocus
        disabled
      />

      <input 
        type="password" 
        className='form-control' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
       Complete Registration 
      </button> 
  </form>;

  return ( ///emit plogin
    <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <h4>RegisterComplete</h4>
              {completeRegistrationForn()}
          </div>
        </div>
    </div>
  )
}

export default RegisterComplete;