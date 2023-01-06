import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    // Prevent default form action
    e.preventDefault();

    // Get form values
    const email = e.target[0].value;
    const password = e.target[1].value; 

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/")
        })
        .catch((error) => {
          setError(true)
        });
    }
    catch(err) {
      setError(true);
    }
  }


  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>App chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <button>Entrar</button>
        </form>
        <p>Não possui uma conta? <Link to="/register">Registrar</Link></p>
      </div>
    </div>
  )
}

export default Login