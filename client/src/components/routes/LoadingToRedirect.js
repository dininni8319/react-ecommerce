import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { currentUser } from '../../functions/auth';

const LoadingToRedirect = () => {
  const [ count, setCount ] = useState(5);
  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000)
    // redirect once count is equal 0
    count === 0 && history.push('/');

    return () => clearInterval(interval);
  }, [count]);

  return (  
    <div className='container p-5 text-center'>
        <p>Redirecting in {count} seconds</p>
    </div>
  );
}
 
export default LoadingToRedirect;