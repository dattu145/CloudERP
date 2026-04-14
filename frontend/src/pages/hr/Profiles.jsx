import { motion } from 'framer-motion';
import { mockEmployees } from '../../data/mockData';
import { Mail, Calendar, Briefcase, TrendingUp, Award, Clock } from 'lucide-react';

const avatarColors = [
  'linear-gradient(135deg,#6366f1,#8b5cf6)',
  'linear-gradient(135deg,#22d3ee,#6366f1)',
  'linear-gradient(135deg,#10b981,#22d3ee)',
  'linear-gradient(135deg,#f59e0b,#f43f5e)',
  'linear-gradient(135deg,#8b5cf6,#f43f5e)',
];

const timeline = [
  { event: 'Promoted to Senior Engineer', date: 'Jan 2025', icon: TrendingUp, color: 'var(--accent-emerald)' },
  { event: 'Completed React Advanced Certification', date: 'Sep 2024', icon: Award, color: 'var(--accent-primary)' },
  { event: 'Led Q3 Product Launch', date: 'Jul 2024', icon: Briefcase, color: 'var(--accent-cyan)' },
  { event: 'Joined CloudERP', date: 'Jan 2022', icon: Clock, color: 'var(--text-muted)' },
];

export default function Profiles() {
  // Show first employee as highlighted profile
  const emp = mockEmployees[0];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Profiles</h1>
          <p className="page-subtitle">Detailed profile view and career history.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-80 flex-shrink-0">{/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div className="glass-card" style={{ padding: 28, textAlign: 'center' }}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: avatarColors[0], margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: 'white',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)'
            }}>{emp.avatar}</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{emp.name}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>{emp.role}</div>
            <span className="badge badge-success">{emp.status}</span>

            <div className="divider" />

            <div className="flex flex-col gap-3 text-left w-full">
              {[
                { icon: Briefcase, label: 'Department', value: emp.dept },
                { icon: Mail,      label: 'Email',      value: `${emp.name.toLowerCase().split(' ')[0]}@clouderp.com` },
                { icon: Calendar,  label: 'Joined',     value: emp.joined },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={15} color="var(--text-muted)" />
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Salary Card */}
          <motion.div className="glass-card" style={{ padding: 24 }}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Annual Salary</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--accent-primary)' }}>
              ₹{emp.salary.toLocaleString('en-IN')}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="flex items-center justify-between text-sm" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Performance Score</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-emerald)' }}>92/100</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '92%' }} /></div>
            </div>
          </motion.div>

          {/* All Employees list */}
          <motion.div className="glass-card" style={{ padding: 20 }}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="section-title">All Profiles</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {mockEmployees.map((e, i) => (
                <div key={e.id} className="nav-item" style={{ padding: '8px 10px' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: avatarColors[i % avatarColors.length],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: 'white'
                  }}>{e.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

        {/* Right: Timeline + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Stats Row */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            {[
              { label: 'Projects Led',    value: '14', color: 'var(--accent-primary)' },
              { label: 'Tasks Completed', value: '238', color: 'var(--accent-emerald)' },
              { label: 'Leaves Taken',    value: '8 / 20', color: 'var(--accent-amber)' },
            ].map((s, i) => (
              <div key={i} className="glass-card glass-card-hover" style={{ padding: 20 }}>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Career Timeline */}
          <motion.div className="glass-card" style={{ padding: 28 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="section-title">Career Timeline</h2>
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />
              {timeline.map((t, i) => (
                <motion.div key={i} style={{ position: 'relative', marginBottom: 28 }}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div style={{
                    position: 'absolute', left: -28, top: 2,
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'var(--bg-card)', border: `2px solid ${t.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <t.icon size={10} color={t.color} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t.event}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.date}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div className="glass-card" style={{ padding: 28 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="flex flex-col gap-4">
              {[
                { skill: 'React & Frontend Dev', level: 95 },
                { skill: 'Node.js & Backend',    level: 82 },
                { skill: 'System Design',         level: 78 },
                { skill: 'Data Analysis',         level: 65 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 13 }}>{s.skill}</span>
                    <span style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 600 }}>{s.level}%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.level}%` }} /></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Documents */}
          <motion.div className="glass-card" style={{ padding: 24 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            <h2 className="section-title">Documents</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Offer Letter', 'NDA Agreement', 'ID Proof', 'Tax Form'].map(doc => (
                <div key={doc} style={{
                  padding: '8px 16px', background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  fontSize: 13, cursor: 'pointer', transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => e.target.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
                >
                  📄 {doc}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
