import React, { useState } from 'react';


function UserForm(props){
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const createNewUser = (event) => {
    event.preventDefault();
    props.onNewUserCreated({name, message});
    setName("");
    setMessage("");
  }


  const onNameChanged = (event) => {
    setName(event.target.value);
  }

  const onMessageChanged = (event) => {
    setMessage(event.target.value);
  }

  return (
      <form className="user-container">
          <div>
              <label>Name</label>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Insert your name"
                value={name}
                required
                onChange={onNameChanged}/>
          </div>
          <div>
              <label>Message</label>
              <input
                className="input"
                type="text"
                message="message"
                value={message}
                onChange={onMessageChanged}
                placeholder="Insert your message"
                required/>
          </div>
          <button className="btn-primary" onClick={createNewUser}>Create new User</button>
      </form>
  )
}


export default UserForm;