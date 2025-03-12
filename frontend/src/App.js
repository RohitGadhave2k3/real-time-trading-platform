import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Payments from './pages/Payments';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/portfolio" element={
              <PrivateRoute>
                <Layout>
                  <Portfolio />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/payments" element={
              <PrivateRoute>
                <Layout>
                  <Payments />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </Provider>
  );
}

export default App; 