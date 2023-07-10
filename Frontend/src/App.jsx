import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage';
import Header from './components/Header';
import ActionPage from './components/ActionPage';
import EditPage from './components/EditPage';

function App() {
  return (
    <Router>
      <div className="container app">
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/add" element={<ActionPage />} />
          <Route path="/edit/:productId" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;