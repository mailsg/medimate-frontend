import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      localStorage.removeItem('token');

      if (response.ok) {
        toast.success('Sign out is succesful');
        navigate('/log_in');
      } else {
        console.error('Sign-out failed.');
      }
      return null;
    } catch (error) {
      toast.error(`Sign out failed ${error}`);
    }
    return null;
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button type="button" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
