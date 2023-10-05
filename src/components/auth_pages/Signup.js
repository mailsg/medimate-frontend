import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function SignUp() {
  const { reset } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    confirm_password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            name: data.name,
            password: data.password,
            confirm_password: data.confirm_password
          },
        }),
      });

      if (response.ok) {
        toast.success(
          "You signed up successfully, you can now log-in with the email and password you just used"
        );
        localStorage.setItem('token', response.headers.get("Authorization"))
        reset();
        console.log(response);
        navigate('/login');
      } else {
        console.log('Unable to fetch');
      }
    } catch (error) {
      toast.error(
        "An error occured while creating the account, please try again"
      );
      reset();
      console.error('Error:', error);
    }
  };

  const handleInputChange = e => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
    </div>
  );
}

export default SignUp;