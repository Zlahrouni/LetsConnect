import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState([]);

    // Listen for any message events from the server
    useEffect(() => {
        // Listen for any message events from the server
        socket.on('server-to-client', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]); // Append new message
        });
    }, [socket]);

    // Send message to server
  const handleSendMessageToSend = () => {
    if (messageToSend) {
      socket.emit('client-to-server', messageToSend);
        setMessageToSend('');
    }
  };

    return (
        <div>
            {/* Input field to type message */}
            <input type="text" value={messageToSend || ''} onChange={(e) => setMessageToSend(e.target.value)} />
            <button onClick={handleSendMessageToSend}>Send</button>
            <ul>
                {/* Display all messages */}
                {messages.map((msg, index) => (
                    <li key={index}>Message received from a client (x) : {msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
