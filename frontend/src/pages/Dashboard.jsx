import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Users,
  Package, ShoppingCart, AlertTriangle, Brain, Zap, Activity, Truck
} from 'lucide-react';
const IconMap = { Activity, DollarSign, Users, Truck };
import { mockStats, mockRevenueData, categoryPieData, aiInsights } from '../data/mockData';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtK = (n) => n >= 1_000_000 ? `₹${(n/1_000_000).toFixed(2)}M` : `₹${(n/1_000).toFixed(0)}K`;

const cardAnim = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const StatCard = ({ label, value, change, positive, icon: Icon, color, delay }) => (
  <motion.div
    className={`stat-card ${color} glass-card-hover`}
    variants={cardAnim}
    transition={{ delay }}
  >
    <div className="flex items-center justify-between mb-4">
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `rgba(${color === 'indigo' ? '99,102,241' : color === 'cyan' ? '34,211,238' : color === 'emerald' ? '16,185,129' : color === 'amber' ? '245,158,11' : '244,63,94'}, 0.15)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={20} color={`var(--accent-${color})`} />
      </div>
      <div className={`flex items-center gap-1 text-sm ${positive ? 'text-emerald-400' : 'text-rose-400'}`}
        style={{ color: positive ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontSize: 13, fontWeight: 600 }}>
        {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}%
      </div>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Outfit, sans-serif', marginBottom: 4 }}>{fmtK(value)}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{label}</div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card" style={{ padding: '12px 16px', fontSize: 13 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {fmtK(p.value)}
        </div>
      ))}
    </div>
  );
};

const severityStyle = {
  critical: { bg: 'rgba(244,63,94,0.1)',  border: 'rgba(244,63,94,0.3)',  dot: 'var(--accent-rose)' },
  warning:  { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', dot: 'var(--accent-amber)' },
  positive: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', dot: 'var(--accent-emerald)' },
};

export default function Dashboard() {
  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Good morning, <span>Neelima</span>
          </h1>
          <p className="page-subtitle">Here's what's happening across your enterprise today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-white)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Revenue"     value={mockStats.totalRevenue}   change={mockStats.revenueGrowth}  positive icon={DollarSign} color="indigo"  delay={0.0} />
        <StatCard label="Total Expenses"    value={mockStats.totalExpenses}  change={mockStats.expenseGrowth}  positive={false} icon={TrendingDown} color="rose" delay={0.07} />
        <StatCard label="Active Employees"  value={mockStats.activeEmployees} change={4.9} positive icon={Users}     color="cyan"    delay={0.14} />
        <StatCard label="Inventory Items"   value={mockStats.inventoryItems} change={2.1}  positive icon={Package}   color="emerald" delay={0.21} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        {/* Revenue vs Expenses */}
        <motion.div className="glass-card p-6 lg:col-span-2" variants={cardAnim} transition={{ delay: 0.28 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title" style={{ margin: 0 }}>Revenue vs Expenses</h2>
            <span className="badge badge-success">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02}/>
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1e6}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" fill="url(#expGrad)" strokeWidth={2} dot={{ fill: '#f43f5e', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown Pie */}
        <motion.div className="glass-card p-6" variants={cardAnim} transition={{ delay: 0.35 }}>
          <h2 className="section-title">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {categoryPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 8 }}>
            {categoryPieData.map((c) => (
              <div key={c.name} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{c.name} <strong style={{ color: 'var(--text-primary)' }}>{c.value}%</strong></span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div className="glass-card" style={{ marginTop: 24, padding: 24 }} variants={cardAnim} transition={{ delay: 0.42 }}>
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={18} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>AI Business Insights</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Powered by predictive analytics</p>
          </div>
          <span className="badge badge-info" style={{ marginLeft: 'auto' }}>
            <Zap size={10} /> Live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => {
            const s = severityStyle[insight.severity];
            const InsightIcon = IconMap[insight.icon] || Activity;
            return (
              <motion.div
                key={i}
                style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: 16 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 18 }}><InsightIcon size={18} color="var(--accent-primary)" /></span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{insight.title}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, marginLeft: 'auto', animation: 'aiPulse 2s ease-in-out infinite' }} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{insight.message}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick KPIs row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {[
          { label: 'Net Profit', value: fmtK(mockStats.netProfit), sub: `+${mockStats.profitGrowth}% MoM`, color: 'var(--accent-emerald)' },
          { label: 'Pending Orders', value: mockStats.pendingOrders, sub: 'Awaiting fulfillment', color: 'var(--accent-amber)' },
          { label: 'Low Stock Items', value: mockStats.lowStockItems, sub: 'Need reorder soon', color: 'var(--accent-rose)' },
        ].map((kpi, i) => (
          <motion.div key={i} className="glass-card glass-card-hover" style={{ padding: 24 }} variants={cardAnim} transition={{ delay: 0.49 + i * 0.07 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{kpi.sub}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
