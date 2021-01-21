import React, { useState } from 'react'

function User (props) {
  let { user } = props

  const [likes, setLikes] = useState(props.likes)

  const increaseLikes = () => {
    setLikes(likes + 1)
  }

  const decreaseLikes = () => {
    setLikes(likes - 1)
  }

  return (
    <div className='user-container'>
      <h3>{user.name}</h3>
      <p>{user.message}</p>
      <h3>{user.likes}</h3>
      <div className='btn-container'>
        <button className='btn-primary' onClick={increaseLikes}>
          Increase
        </button>
        <button
          className='btn-primary'
          onClick={decreaseLikes}
          disabled={user.likes === 0}
        >
          Decrease
        </button>
      </div>
    </div>
  )
}

export default User
