import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockEmployees } from '../../data/mockData';
import { Plus, Search, Mail, Phone, Calendar } from 'lucide-react';

const avatarColors = [
  'linear-gradient(135deg,#6366f1,#8b5cf6)',
  'linear-gradient(135deg,#22d3ee,#6366f1)',
  'linear-gradient(135deg,#10b981,#22d3ee)',
  'linear-gradient(135deg,#f59e0b,#f43f5e)',
  'linear-gradient(135deg,#8b5cf6,#f43f5e)',
];

export default function Employees() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'table'
  const [showModal, setShowModal] = useState(false);

  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Directory</h1>
          <p className="page-subtitle">{mockEmployees.length} employees across all departments.</p>
        </div>
        <div className="flex gap-2">
          <button className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('grid')}>Grid</button>
          <button className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('table')}>Table</button>
          <button className="btn btn-primary" id="hr-add-employee-btn" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Add Employee
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="header-search" style={{ maxWidth: 380, marginBottom: 24 }}>
        <Search size={15} color="var(--text-muted)" />
        <input
          placeholder="Search by name or department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filtered.map((emp, i) => (
            <motion.div
              key={emp.id}
              className="glass-card glass-card-hover"
              style={{ padding: 24 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: avatarColors[i % avatarColors.length],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: 'white', flexShrink: 0
                }}>
                  {emp.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{emp.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{emp.role}</div>
                </div>
              </div>
              <div className="divider" style={{ margin: '12px 0' }} />
              <div style={{ display: 'grid', gap: 8 }}>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Mail size={13} color="var(--text-muted)" />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {emp.name.toLowerCase().replace(' ', '.')}@clouderp.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} color="var(--text-muted)" />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Joined: {emp.joined}</span>
                </div>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
                <span className="badge badge-gray">{emp.dept}</span>
                <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{emp.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="glass-card">
          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table>
              <thead>
                <tr><th>Employee</th><th>Role</th><th>Department</th><th>Joined</th><th>Salary</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: avatarColors[i % avatarColors.length],
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0
                        }}>{emp.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{emp.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{emp.role}</td>
                    <td><span className="badge badge-gray">{emp.dept}</span></td>
                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{emp.joined}</td>
                    <td style={{ fontWeight: 600 }}>₹{emp.salary.toLocaleString('en-IN')}</td>
                    <td><span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{emp.status}</span></td>
                    <td>
                      <a href={`/hr/profiles`} className="btn btn-sm btn-secondary" id={`hr-view-${emp.id}-btn`}>View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Employee</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="e.g. Rahul Verma" /></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="rahul@clouderp.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Department</label>
                  <select className="form-select">
                    <option>Technology</option><option>Finance</option><option>HR</option><option>Sales</option><option>Operations</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Designation</label><input className="form-input" placeholder="e.g. Software Engineer" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Salary (₹)</label><input className="form-input" type="number" placeholder="0" /></div>
                <div className="form-group"><label className="form-label">Date Joined</label><input className="form-input" type="date" /></div>
              </div>
              <div className="flex gap-3" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="hr-submit-employee-btn">Add Employee</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
