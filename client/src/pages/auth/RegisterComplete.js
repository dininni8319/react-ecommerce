import React, { useState, useEffect } from "react";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailLink(email, )
    } catch (error) {
        
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

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