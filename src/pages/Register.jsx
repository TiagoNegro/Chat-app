import React from 'react'
import userSquare from '../img/user-focus.svg'
import { useState } from 'react'
import { auth, storage, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'



const Register = () => {
  const navigate = useNavigate();
  // Variable to show that something went wrong
  const [error, setError] = useState(false);

  // Handler form submission
  const handleSubmit = async (e) => {
    // Prevent default form action
    e.preventDefault();

    // Get form values
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];  

    try {
      // Create a user
      const reg = await createUserWithEmailAndPassword(auth, email, password);

      // Storage file
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update profile
              await updateProfile(reg.user, {
                displayName,
                photoURL: downloadURL
              });
              // Create user on firestore
              await setDoc(doc(db, "users", reg.user.uid), {
                uid: reg.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              });

              // Create user chats
              await setDoc(doc(db, "userChats", reg.user.uid), {});
              navigate("/");

            }
            catch (err) {
              console.log(err)
              setError(true);
            }
          })
        })
    }
    catch(err) {
      setError(true);
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>App chat</span>
        <span className='title'>Registro</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nome de exibição' required />
          <input type="email" placeholder='email' required />
          <input type="password" placeholder='password' required min={6} />
          <input style={{ display: "none" }} type="file" id="file" accept='image/*' />
          <label htmlFor="file">
            <img src={userSquare} alt="" />
            <span>Adicionar imagem</span>
          </label>
          <button>Entrar</button>
          {error && <span>Algo deu errado</span>}
        </form>
        <p>Possui uma conta? <Link to="/Login">Entrar</Link></p>
      </div>
    </div>
  )
}

export default Register