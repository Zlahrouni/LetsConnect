
import "./LoginPage.css";
import { LoginPageProps } from "../../types/types";
import Login from "../../components/Login/Login";

const LoginPage = ({ socket }: LoginPageProps) => {

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card" style={{ marginTop: '100px'}}>
            <div className="card-body" >
              <h1 style={{ textAlign: 'center'}}>WhattsNew App</h1>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
