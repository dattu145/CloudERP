import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockTransactions } from '../../data/mockData';
import { Plus, Download } from 'lucide-react';

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

const accountGroups = [
  { name: 'Cash & Bank', balance: 8_420_000, type: 'Asset',     trend: '+2.1%' },
  { name: 'Accounts Receivable', balance: 1_250_000, type: 'Asset', trend: '+5.3%' },
  { name: 'Accounts Payable', balance: 640_000, type: 'Liability', trend: '-1.2%' },
  { name: 'Short-Term Loans', balance: 2_100_000, type: 'Liability', trend: '0%' },
];

export default function Accounts() {
  const [showModal, setShowModal] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Accounts</h1>
          <p className="page-subtitle">Manage your chart of accounts and balances.</p>
        </div>
        <button className="btn btn-primary" id="accounts-add-btn" onClick={() => setShowModal(true)}>
          <Plus size={15} /> New Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {accountGroups.map((a, i) => (
          <motion.div key={i} className="glass-card glass-card-hover" style={{ padding: 24 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.name}</span>
              <span className={`badge ${a.type === 'Asset' ? 'badge-success' : 'badge-danger'}`}>{a.type}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
              {fmt(a.balance)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Trend: {a.trend} this month</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card mt-6">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Ledger Entries</h2>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr><th>Date</th><th>Description</th><th>Category</th><th>Debit</th><th>Credit</th><th>Status</th></tr>
            </thead>
            <tbody>
              {mockTransactions.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.date}</td>
                  <td>{t.ref}</td>
                  <td>{t.category}</td>
                  <td style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
                    {t.type === 'Expense' ? fmt(t.amount) : '—'}
                  </td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {t.type === 'Income' ? fmt(t.amount) : '—'}
                  </td>
                  <td>
                    <span className={`badge ${t.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">New Account</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="form-group"><label className="form-label">Account Name</label><input className="form-input" placeholder="e.g. Cash & Bank" /></div>
              <div className="form-group"><label className="form-label">Type</label><select className="form-select"><option>Asset</option><option>Liability</option><option>Equity</option></select></div>
              <div className="form-group"><label className="form-label">Opening Balance (₹)</label><input className="form-input" type="number" placeholder="0.00" /></div>
              <div className="flex gap-3" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="accounts-submit-btn">Create</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
