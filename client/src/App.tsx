
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/chat" element={<ChatPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
