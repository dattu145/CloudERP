import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { mockRevenueData, categoryPieData, deptExpenseData, mockStats } from '../../data/mockData';
import { Download, FileText, Calendar } from 'lucide-react';

const fmtK = (n) => n >= 1_000_000 ? `₹${(n / 1_000_000).toFixed(2)}M` : `₹${(n / 1_000).toFixed(0)}K`;

const PIECOLORS = ['#6366f1', '#22d3ee', '#8b5cf6', '#f59e0b', '#4a5568'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card" style={{ padding: '12px 16px', fontSize: 13 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? fmtK(p.value) : p.value}
          {p.name === 'value' ? '%' : ''}
        </div>
      ))}
    </div>
  );
};

const reportTypes = ['Financial Summary', 'Payroll Report', 'Inventory Audit', 'Supplier Performance'];

export default function Reports() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Comprehensive business intelligence across all modules.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" id="reports-date-btn"><Calendar size={15}/> Date Range</button>
          <button className="btn btn-primary" id="reports-export-btn"><Download size={15}/> Export PDF</button>
        </div>
      </div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {reportTypes.map((r, i) => (
          <motion.div key={r} className="glass-card glass-card-hover"
            style={{ padding: 20, cursor: 'pointer' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02 }}>
            <FileText size={22} color="var(--accent-primary)" style={{ marginBottom: 10 }} />
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click to generate & download</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
        {/* Revenue vs Expenses Bar */}
        <motion.div className="glass-card p-6"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="section-title">Revenue vs Expenses (Monthly)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockRevenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1e6}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue"  name="Revenue"  fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown Pie */}
        <motion.div className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
          <h2 className="section-title">Expense Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryPieData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {categoryPieData.map((_, i) => <Cell key={i} fill={PIECOLORS[i]} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
            {categoryPieData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: PIECOLORS[i] }} />
                <span style={{ color: 'var(--text-secondary)' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-width: Net Profit trend */}
      <motion.div className="glass-card p-6 mt-6" style={{ marginBottom: 24 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="section-title">Net Profit Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={mockRevenueData.map(d => ({ ...d, profit: d.revenue - d.expenses }))}>
            <defs>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmtK(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#10b981" fill="url(#profitGrad)" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Dept Expense Breakdown Bar */}
      <motion.div className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="section-title">Department-wise Expense Share (%)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={deptExpenseData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="dept" tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} width={90} />
            <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
            <Bar dataKey="value" name="Expense Share" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
