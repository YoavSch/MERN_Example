import React, { useState } from 'react';
import User from './components/User'
import UserForm from './components/UserForm'
import './App.css'

function App(){
  const [users, setUsers] = useState([
    {
        name : "Queen Elizabeth",
        message : "Queen Elizabeth message",
        likes : 1
      },
      {
        name : "Donald Trump",
        message : "Donald Trump message",
        likes : 2
      },
      {
        name : "Leonardo da Vinci",
        message : "Leonardo da Vinci message",
        likes : 3
      },
      {
        name : "Walt Disney",
        message : "Walt Disney message",
        likes : 4
      }
  ]);

  const onLikesChanged = () => {
     console.log('likes changed');
  }

  const onNewUserCreated = (event) => {
     const newUser = {
         name : event.name,
         message : event.message,
         likes : 0
     };

     setUsers([...users, newUser]);
  }

  return (
     <div className="app">
       <UserForm onNewUserCreated={onNewUserCreated}/>
       {users.map((user, i)=>{
          return (<User key={i} user={user} increaseLikes={onLikesChanged}/>)
       })}
     </div>
  )
}

export default App;