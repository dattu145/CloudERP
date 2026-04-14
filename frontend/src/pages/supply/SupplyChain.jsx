import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockSuppliers as suppliers } from '../../data/mockData';
import { Plus, Mail, Phone, Search } from 'lucide-react';

export default function SupplyChain() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Supply Chain</h1>
          <p className="page-subtitle">Manage suppliers and procurement relationships.</p>
        </div>
        <button className="btn btn-primary" id="supply-add-supplier-btn" onClick={() => setShowModal(true)}>
          <Plus size={15} /> Add Supplier
        </button>
      </div>

      {/* KPIs */}
      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Suppliers',   value: suppliers.length,                                          color: 'var(--accent-primary)' },
          { label: 'Active Suppliers',  value: suppliers.filter(s => s.status === 'Active').length,       color: 'var(--accent-emerald)' },
          { label: 'Inactive',          value: suppliers.filter(s => s.status === 'Inactive').length,     color: 'var(--accent-rose)' },
          { label: 'Total Orders Sent', value: suppliers.reduce((a, s) => a + s.orders, 0),               color: 'var(--accent-cyan)' },
        ].map((s, i) => (
          <motion.div key={i} className="glass-card glass-card-hover" style={{ padding: 22 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="header-search" style={{ maxWidth: 380, marginBottom: 20 }}>
        <Search size={15} color="var(--text-muted)" />
        <input placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Supplier Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {filtered.map((sup, i) => (
          <motion.div key={sup.id} className="glass-card glass-card-hover" style={{ padding: 24 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{sup.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{sup.contact}</div>
              </div>
              <span className={`badge ${sup.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{sup.status}</span>
            </div>
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'grid', gap: 8 }}>
              <div className="flex items-center gap-2">
                <Mail size={13} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sup.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sup.phone}</span>
              </div>
            </div>
            <div className="flex items-center justify-between" style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Total Orders: <strong style={{ color: 'var(--text-primary)' }}>{sup.orders}</strong>
              </div>
              <button className="btn btn-sm btn-secondary" id={`supply-view-${sup.id}-btn`}>View Orders</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Supplier</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Company Name</label><input className="form-input" placeholder="e.g. TechParts Global" /></div>
                <div className="form-group"><label className="form-label">Contact Person</label><input className="form-input" placeholder="e.g. John Bradley" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="contact@supplier.com" /></div>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="+91-XXXXXXXXXX" /></div>
              </div>
              <div className="form-group"><label className="form-label">Address</label><input className="form-input" placeholder="Full address..." /></div>
              <div className="flex gap-3" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="supply-submit-supplier-btn">Add Supplier</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
