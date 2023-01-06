import React, { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase';

const Search = () => {
  const [userName, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch (err) {
      setErr(true);
    }

  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = () => {
    
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Procurar usuário' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} />
      </div>
      {error && <span>Usuário não encontrado</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search