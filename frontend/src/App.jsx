import React, { useState, useEffect } from 'react';

function App() {
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealthStatus(data.status))
      .catch(err => setHealthStatus('Offline'));
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">CloudERP ✨</div>
        <div>
          <button className="btn-primary">Sign In</button>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">One Platform to Run Your Entire Business</h1>
          <p className="hero-subtitle">Finance, HR, Inventory, and AI Predictions combined into one seamlessly integrated experience.</p>
          <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>Get Started</button>
          
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: healthStatus === 'ok' ? 'var(--success)' : 'var(--danger)' }}>
            API Status: {healthStatus.toUpperCase()}
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <div className="card-icon">💰</div>
            <h3 className="card-title">Finance & Billing</h3>
            <p className="card-desc">Track income, manage invoices, and keep your accounting perfectly balanced in real-time.</p>
          </div>
          
          <div className="card">
            <div className="card-icon">👨‍💼</div>
            <h3 className="card-title">Human Resources</h3>
            <p className="card-desc">Manage employee profiles, track attendance, run payroll securely, and oversee your talent.</p>
          </div>
          
          <div className="card">
            <div className="card-icon">📦</div>
            <h3 className="card-title">Inventory Control</h3>
            <p className="card-desc">Real-time stock tracking, automated reordering flows, and supply chain insights.</p>
          </div>
          
          <div className="card">
            <div className="card-icon">🤖</div>
            <h3 className="card-title">AI Predictions</h3>
            <p className="card-desc">Foresee product demand, analyze seasonal patterns, and make data-driven autonomous decisions.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
