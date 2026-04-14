import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, DollarSign, Users, Package, Truck,
  BarChart3, Brain, ChevronLeft, ChevronRight, Bell,
  Search, Settings, LogOut, CreditCard, Briefcase,
  ShoppingCart, AlertTriangle, FileText
} from 'lucide-react';

const navGroups = [
  {
    label: 'Core',
    items: [
      { path: '/',          label: 'Dashboard',   icon: LayoutDashboard },
      { path: '/reports',   label: 'Reports',     icon: BarChart3 },
      { path: '/ai',        label: 'AI Insights', icon: Brain },
    ]
  },
  {
    label: 'Finance',
    items: [
      { path: '/finance',         label: 'Overview',     icon: DollarSign },
      { path: '/finance/accounts',label: 'Accounts',     icon: CreditCard },
      { path: '/finance/payroll', label: 'Payroll',      icon: Briefcase },
    ]
  },
  {
    label: 'People',
    items: [
      { path: '/hr',          label: 'Employees',   icon: Users },
      { path: '/hr/profiles', label: 'Profiles',    icon: FileText },
    ]
  },
  {
    label: 'Operations',
    items: [
      { path: '/inventory',   label: 'Inventory',    icon: Package },
      { path: '/supply',      label: 'Supply Chain', icon: Truck },
      { path: '/supply/orders', label: 'Orders',     icon: ShoppingCart },
    ]
  }
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <motion.aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Brain size={20} color="white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              CloudERP
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 16 }}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.label : ''}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="nav-icon" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="nav-label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {collapsed ? <ChevronRight className="nav-icon" /> : <ChevronLeft className="nav-icon" />}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="nav-label"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={handleLogout}
          className="nav-item"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-rose)', marginTop: 4 }}
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut className="nav-icon" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span className="nav-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
