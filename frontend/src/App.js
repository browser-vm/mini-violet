import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProxyForm from './components/ProxyForm';
import ProxyResult from './components/ProxyResult';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Mini Violet Proxy</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ProxyForm />} />
            <Route path="/result" element={<ProxyResult />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
