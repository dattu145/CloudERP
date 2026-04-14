import { motion } from 'framer-motion';
import { aiInsights, mockProducts, mockStats } from '../data/mockData';
import { Brain, Zap, TrendingUp, AlertTriangle, ChevronRight, Activity, DollarSign, Users, Truck } from 'lucide-react';
const IconMap = { Activity, DollarSign, Users, Truck };
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, ReferenceLine
} from 'recharts';

// Simulate AI-predicted demand data
const demandForecast = [
  { week: 'W1', actual: 30, predicted: 32 },
  { week: 'W2', actual: 35, predicted: 36 },
  { week: 'W3', actual: 28, predicted: 31 },
  { week: 'W4', actual: 42, predicted: 40 },
  { week: 'W5', actual: null, predicted: 65 },  // future
  { week: 'W6', actual: null, predicted: 88 },
  { week: 'W7', actual: null, predicted: 102 },
];

const cashflowForecast = [
  { month: 'Apr', actual: 4850320, predicted: 4900000 },
  { month: 'May', actual: null, predicted: 5200000 },
  { month: 'Jun', actual: null, predicted: 5600000 },
  { month: 'Jul', actual: null, predicted: 5400000 },
];

const severityStyle = {
  critical: { bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.3)',  dot: '#f43f5e', label: 'Critical' },
  warning:  { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', dot: '#f59e0b', label: 'Warning'  },
  positive: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', dot: '#10b981', label: 'Positive' },
};

const recommendations = [
  { action: 'Reorder RTX 4080 GPU (critical stock)',      impact: 'High',   effort: 'Low',  module: 'Inventory' },
  { action: 'Process pending payroll for 2 employees',    impact: 'High',   effort: 'Low',  module: 'Payroll' },
  { action: 'Escalate delayed ElectroPro Inc order',      impact: 'Medium', effort: 'Low',  module: 'Supply Chain' },
  { action: 'Restock Logitech MX Master 3 mouse',         impact: 'Medium', effort: 'Low',  module: 'Inventory' },
  { action: 'Schedule Q2 financial review with board',    impact: 'High',   effort: 'High', module: 'Finance' },
];

const impactColor = { High: 'var(--accent-rose)', Medium: 'var(--accent-amber)', Low: 'var(--accent-emerald)' };

export default function AIInsights() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>AI Insights</span> & Predictions
          </h1>
          <p className="page-subtitle">Powered by advanced machine learning and predictive analytics.</p>
        </div>
        <div className="flex items-center gap-2">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)', borderRadius: 99
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', animation: 'aiPulse 2s infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-secondary)' }}>AI Engine Active</span>
          </div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        {aiInsights.map((insight, i) => {
          const s = severityStyle[insight.severity];
          const InsightIcon = IconMap[insight.icon] || Activity;
          return (
            <motion.div key={i} className="glass-card glass-card-hover"
              style={{ padding: 24, background: s.bg, border: `1px solid ${s.border}`, cursor: 'pointer' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.015 }}>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 24 }}><InsightIcon size={24} color="var(--accent-primary)" /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{insight.title}</div>
                  <span className={`badge ${
                    insight.severity === 'critical' ? 'badge-danger' :
                    insight.severity === 'warning'  ? 'badge-warning' : 'badge-success'
                  }`} style={{ marginTop: 4, display: 'inline-flex' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.dot, animation: 'aiPulse 2.5s ease-in-out infinite' }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{insight.message}</p>
              <div className="flex items-center gap-1" style={{ marginTop: 14, fontSize: 12, color: 'var(--accent-secondary)', fontWeight: 600 }}>
                View Details <ChevronRight size={13} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* GPU Demand Forecast */}
        <motion.div className="glass-card p-6 mt-6"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <Brain size={16} color="var(--accent-primary)" />
            <h2 className="section-title" style={{ margin: 0 }}>GPU Demand Forecast</h2>
            <span className="badge badge-purple" style={{ marginLeft: 'auto' }}>AI Predicted</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
              <ReferenceLine x="W5" stroke="rgba(99,102,241,0.4)" strokeDasharray="4 4" label={{ value: '← Forecast', fill: 'var(--text-muted)', fontSize: 11 }} />
              <Line type="monotone" dataKey="actual"    name="Actual Demand"    stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} connectNulls={false} />
              <Line type="monotone" dataKey="predicted" name="AI Prediction"    stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            🔮 AI predicts a 340% demand spike starting Week 5. Immediate reorder recommended.
          </p>
        </motion.div>

        {/* Cashflow Forecast */}
        <motion.div className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} color="var(--accent-emerald)" />
            <h2 className="section-title" style={{ margin: 0 }}>Revenue Cashflow Forecast</h2>
            <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Positive Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cashflowForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1e6}M`} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13 }} />
              <Line type="monotone" dataKey="actual"    name="Actual Revenue"   stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} connectNulls={false} />
              <Line type="monotone" dataKey="predicted" name="Predicted Revenue" stroke="#22d3ee" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#22d3ee' }} />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            📈 Revenue forecast shows a 15.5% upward trend over next quarter.
          </p>
        </motion.div>
      </div>

      {/* AI Action Recommendations */}
      <motion.div className="glass-card mt-6" style={{ padding: 28 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="flex items-center gap-3 mb-6">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--accent-primary),var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>AI Action Recommendations</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Prioritized list of actions to improve business performance</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recommendations.map((rec, i) => (
            <motion.div key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', cursor: 'pointer' }}
              whileHover={{ x: 4, borderColor: 'var(--border-bright)' }}
              transition={{ duration: 0.15 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{rec.action}</div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-gray" style={{ fontSize: 11 }}>{rec.module}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Effort: {rec.effort}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: impactColor[rec.impact], fontWeight: 700 }}>{rec.impact} Impact</div>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
