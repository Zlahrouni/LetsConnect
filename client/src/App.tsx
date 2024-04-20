
import "./index.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotConnected from "./components/NotConnected/NotConnected.tsx";
import {useEffect, useState} from "react";

function App() {
    const [isConnected, setIsConnected] = useState(false); // Add a state variable to track the connection status
    const socket = io('http://localhost:4000');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
            setIsConnected(true); // Update the connection status when connected
        });

        socket.on('connect_error', (error) => {
            console.log('Connection to the server failed', error);
            setIsConnected(false); // Update the connection status when connection failed
        });



        return () => {
            socket.off('connect');
            socket.off('connect_error');
        };
    }, []);
  return (
    <BrowserRouter>
      <div className='pageContainer'>
        <Routes>
            {/*We show etheir the not connected page or the login/chatpage that mean if*/}
            <Route path="/" element={ isConnected ? <LoginPage socket={socket}/> : <NotConnected/>}></Route>
            <Route path="/chat" element={ isConnected ? <ChatPage socket={socket}/> : <NotConnected/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
