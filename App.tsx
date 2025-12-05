import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Prompts from './pages/Prompts';
import PromptDetail from './pages/PromptDetail';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import Generator from './pages/Generator';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';

// Using HashRouter as per instructions for environments where URL path manipulation is restricted
const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<Payment />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;