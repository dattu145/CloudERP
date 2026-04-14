import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockOrders } from '../../data/mockData';
import { Plus, Truck, CheckCircle, Clock, XCircle, Package } from 'lucide-react';

const statusIcon = {
  Pending:   { icon: Clock,        color: 'var(--accent-amber)',   badge: 'badge-warning' },
  Approved:  { icon: CheckCircle,  color: 'var(--accent-primary)', badge: 'badge-purple' },
  Shipped:   { icon: Truck,        color: 'var(--accent-cyan)',    badge: 'badge-info' },
  Delivered: { icon: CheckCircle,  color: 'var(--accent-emerald)', badge: 'badge-success' },
  Cancelled: { icon: XCircle,      color: 'var(--accent-rose)',    badge: 'badge-danger' },
};

const pipeline = ['Pending', 'Approved', 'Shipped', 'Delivered'];

export default function Orders() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = filter === 'All' ? mockOrders : mockOrders.filter(o => o.status === filter);
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Purchase Orders</h1>
          <p className="page-subtitle">Track all procurement orders and their delivery pipeline.</p>
        </div>
        <button className="btn btn-primary" id="orders-add-btn" onClick={() => setShowModal(true)}>
          <Plus size={15} /> New Order
        </button>
      </div>

      {/* Pipeline Visual */}
      <motion.div className="glass-card" style={{ padding: 24, marginBottom: 24 }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="section-title">Order Pipeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {pipeline.map((stage, i) => {
            const count = mockOrders.filter(o => o.status === stage).length;
            const { icon: Icon, color } = statusIcon[stage];
            return (
              <div key={stage} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', margin: '0 auto 10px',
                  background: `${color}22`, border: `2px solid ${color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={22} color={color} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color }}>{count}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{stage}</div>
                {i < pipeline.length - 1 && (
                  <div className="hidden lg:block" style={{ position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)' }}>→</div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled'].map(f => (
          <button key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            id={`orders-filter-${f.toLowerCase()}-btn`}
            onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="glass-card">
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Order ID</th><th>Supplier</th><th>Items</th>
                <th>Total Amount</th><th>Order Date</th><th>Expected</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const { badge } = statusIcon[order.status] || { badge: 'badge-gray' };
                return (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{order.id}</td>
                    <td style={{ fontWeight: 600 }}>{order.supplier}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Package size={14} color="var(--text-muted)" />
                        {order.items} items
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{fmt(order.total)}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{order.date}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{order.expected}</td>
                    <td><span className={`badge ${badge}`}>{order.status}</span></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3 className="modal-title">Create Purchase Order</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="form-group">
                <label className="form-label">Supplier</label>
                <select className="form-select">
                  <option>TechParts Global</option>
                  <option>ElectroPro Inc</option>
                  <option>NovaTech Supplies</option>
                  <option>FastDrive Co.</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group"><label className="form-label">Total Amount (₹)</label><input className="form-input" type="number" placeholder="0.00" /></div>
                <div className="form-group"><label className="form-label">Expected Delivery</label><input className="form-input" type="date" /></div>
              </div>
              <div className="form-group"><label className="form-label">Notes</label><input className="form-input" placeholder="Order notes or instructions..." /></div>
              <div className="flex gap-3" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" id="orders-submit-btn">Create Order</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
