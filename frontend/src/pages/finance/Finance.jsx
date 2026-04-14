import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowDownLeft, Filter, Download } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { mockTransactions, mockRevenueData, mockStats } from '../../data/mockData';

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;
const fmtK = (n) => n >= 1_000_000 ? `₹${(n/1_000_000).toFixed(2)}M` : `₹${(n/1_000).toFixed(0)}K`;

export default function Finance() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = filter === 'All' ? mockTransactions : mockTransactions.filter(t => t.type === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Finance Overview</h1>
          <p className="page-subtitle">Monitor cashflows, transactions and financial health.</p>
        </div>
        <button className="btn btn-primary" id="finance-add-transaction-btn" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Record Transaction
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { label: 'Total Revenue',  value: mockStats.totalRevenue,  color: 'var(--accent-emerald)', icon: ArrowUpRight },
          { label: 'Total Expenses', value: mockStats.totalExpenses, color: 'var(--accent-rose)',    icon: ArrowDownLeft },
          { label: 'Net Profit',     value: mockStats.netProfit,     color: 'var(--accent-primary)', icon: ArrowUpRight },
        ].map((m, i) => (
          <motion.div key={i} className="glass-card glass-card-hover" style={{ padding: 24 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.label}</span>
              <m.icon size={18} color={m.color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: m.color }}>
              {fmtK(m.value)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div className="glass-card lg:col-span-2 mt-6" style={{ padding: 24, marginBottom: 24 }}>
        <h2 className="section-title">Monthly Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={mockRevenueData}>
            <defs>
              <linearGradient id="finRevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1e6}M`} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#finRevGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Transactions Table */}
      <div className="glass-card">
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Recent Transactions</h2>
          <div className="flex gap-2">
            {['All', 'Income', 'Expense'].map(f => (
              <button key={f}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                id={`finance-filter-${f.toLowerCase()}-btn`}
                onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
            <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          </div>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Type</th><th>Category</th><th>Reference</th><th>Amount</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: 12 }}>{t.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {t.type === 'Income'
                        ? <ArrowUpRight size={14} color="var(--accent-emerald)" />
                        : <ArrowDownLeft size={14} color="var(--accent-rose)" />}
                      {t.type}
                    </div>
                  </td>
                  <td>{t.category}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{t.ref}</td>
                  <td style={{ fontWeight: 700, color: t.type === 'Income' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    {t.type === 'Income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.date}</td>
                  <td>
                    <span className={`badge ${t.status === 'Completed' ? 'badge-success' : t.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">Record Transaction</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select"><option>Income</option><option>Expense</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input className="form-input" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" placeholder="e.g. Sales, Salaries..." />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input className="form-input" placeholder="Brief description..." />
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="finance-submit-transaction-btn">Save Transaction</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
