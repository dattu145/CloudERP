import { motion } from 'framer-motion';
import { mockPayroll } from '../../data/mockData';
import { CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function Payroll() {
  const totalNet = mockPayroll.reduce((s, p) => s + p.net, 0);
  const totalBasic = mockPayroll.reduce((s, p) => s + p.basic, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Payroll Management</h1>
          <p className="page-subtitle">Process and manage employee salaries for March 2026.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" id="payroll-export-btn"><Download size={15}/> Export</button>
          <button className="btn btn-primary" id="payroll-process-btn">Process All Payroll</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[
          { label: 'Total Gross Salary', value: fmt(totalBasic), color: 'var(--accent-primary)' },
          { label: 'Total Net Disbursed', value: fmt(totalNet), color: 'var(--accent-emerald)' },
          { label: 'Pending Payroll',    value: `${mockPayroll.filter(p => p.status !== 'Paid').length} employees`, color: 'var(--accent-amber)' },
        ].map((s, i) => (
          <div key={i} className="glass-card glass-card-hover" style={{ padding: 24 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Payroll Table */}
      <div className="glass-card mt-6">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Payroll Register — April 2026</h2>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Employee</th><th>Basic</th><th>Allowances</th>
                <th>Deductions</th><th>Net Pay</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPayroll.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{p.id}</td>
                  <td style={{ fontWeight: 600 }}>{p.employee}</td>
                  <td>{fmt(p.basic)}</td>
                  <td style={{ color: 'var(--accent-emerald)' }}>+{fmt(p.allowances)}</td>
                  <td style={{ color: 'var(--accent-rose)' }}>-{fmt(p.deductions)}</td>
                  <td style={{ fontWeight: 700 }}>{fmt(p.net)}</td>
                  <td>
                    <span className={`badge ${
                      p.status === 'Paid' ? 'badge-success' :
                      p.status === 'Pending' ? 'badge-warning' : 'badge-info'
                    }`}>{p.status}</span>
                  </td>
                  <td>
                    {p.status !== 'Paid' && (
                      <button className="btn btn-sm btn-primary" id={`payroll-pay-${p.id}-btn`}>Pay Now</button>
                    )}
                    {p.status === 'Paid' && (
                      <button className="btn btn-sm btn-secondary"><Download size={12}/> Slip</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
