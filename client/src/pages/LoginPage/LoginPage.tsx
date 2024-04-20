
import "./LoginPage.css";
import { LoginPageProps } from "../../types/types";
import Login from "../../components/Login/Login";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = ({ socket}: LoginPageProps) => {
  const navigate = useNavigate();
  useEffect(() => {

    // check local storage and connect
    if (localStorage.getItem('username')) {
      socket.emit('login', { username: localStorage.getItem('username') });
    }
    socket.on("connect", () => {
      console.log("Connected to the serversss");
    });

    socket.on("connect_error", (error) => {
      console.log("Connection to the server failedsss", error);
    });

    socket.on('loginsuccess', (data) => {
      console.log('Login success:', data);
      localStorage.setItem('username', data.username);
      navigate('/chat');
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off('loginsuccess');
    };
  }, [socket]);
  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card" style={{ marginTop: '100px'}}>
            <div className="card-body" >
              <h1 style={{ textAlign: 'center'}}>WhattsNew App</h1>
              <Login socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
