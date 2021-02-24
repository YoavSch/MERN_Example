import React from 'react';

function ChatLog (props) {
    let { messages } = props

    return  messages.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }


export default ChatLog;