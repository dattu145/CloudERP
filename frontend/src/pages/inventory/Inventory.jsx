import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockProducts } from '../../data/mockData';
import { AlertTriangle, Plus, Search, Package } from 'lucide-react';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const lowStock = mockProducts.filter(p => p.status !== 'Good');
  const filtered = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const stockColor = { Good: 'badge-success', Low: 'badge-warning', Critical: 'badge-danger' };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory</h1>
          <p className="page-subtitle">Track stock levels, reorder alerts, and product catalog.</p>
        </div>
        <button className="btn btn-primary" id="inventory-add-btn" onClick={() => setShowModal(true)}>
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Products', value: mockProducts.length, color: 'var(--accent-primary)' },
          { label: 'Total Stock Units', value: mockProducts.reduce((s, p) => s + p.qty, 0), color: 'var(--accent-cyan)' },
          { label: 'Low Stock', value: mockProducts.filter(p => p.status === 'Low').length, color: 'var(--accent-amber)' },
          { label: 'Critical', value: mockProducts.filter(p => p.status === 'Critical').length, color: 'var(--accent-rose)' },
        ].map((s, i) => (
          <motion.div key={i} className="glass-card glass-card-hover" style={{ padding: 22 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Alerts Panel */}
      {lowStock.length > 0 && (
        <motion.div
          className="glass-card"
          style={{ padding: 20, marginBottom: 24, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={18} color="var(--accent-amber)" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Reorder Alerts ({lowStock.length} items)</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {lowStock.map(p => (
              <div key={p.id} style={{
                background: p.status === 'Critical' ? 'rgba(244,63,94,0.1)' : 'rgba(245,158,11,0.1)',
                border: `1px solid ${p.status === 'Critical' ? 'rgba(244,63,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
                borderRadius: 8, padding: '8px 14px', fontSize: 13
              }}>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>Qty: {p.qty}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="header-search" style={{ maxWidth: 380, marginBottom: 20 }}>
        <Search size={15} color="var(--text-muted)" />
        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Products Table */}
      <div className="glass-card">
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Product</th><th>SKU</th><th>Category</th><th>Qty</th>
                <th>Unit Price</th><th>Reorder At</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Package size={16} color="var(--text-muted)" />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{p.sku}</td>
                  <td><span className="badge badge-gray">{p.category}</span></td>
                  <td>
                    <span style={{ fontWeight: 700, color: p.qty < p.reorderLevel ? 'var(--accent-rose)' : 'var(--text-primary)' }}>
                      {p.qty}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>₹{p.price.toLocaleString('en-IN')}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{p.reorderLevel}</td>
                  <td>
                    <span className={`badge ${stockColor[p.status]}`}>{p.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Product</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="form-group"><label className="form-label">Product Name</label><input className="form-input" placeholder="e.g. Intel Core i9" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">SKU</label><input className="form-input" placeholder="CPU-XXX-001" /></div>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-select"><option>Electronics</option><option>Storage</option><option>Display</option><option>Peripherals</option></select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group"><label className="form-label">Quantity</label><input className="form-input" type="number" placeholder="0" /></div>
                <div className="form-group"><label className="form-label">Price (₹)</label><input className="form-input" type="number" placeholder="0" /></div>
                <div className="form-group"><label className="form-label">Reorder Level</label><input className="form-input" type="number" placeholder="10" /></div>
              </div>
              <div className="flex gap-3" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="inventory-submit-btn">Add Product</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
