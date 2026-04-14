import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Lock, Eye, EyeOff, Brain,
  AlertCircle, CheckCircle2, Loader2, ArrowRight,
} from 'lucide-react';

/* ─── Page Background ───────────────────────────────────────────── */
function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-indigo-50/70 to-purple-50/80">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-100/70 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-100/70 blur-3xl" />
    </div>
  );
}

/* ─── Form Input ────────────────────────────────────────────────── */
function FormInput({ id, type, label, value, onChange, Icon, error, rightSlot }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
            focused ? 'text-indigo-500' : 'text-gray-400'
          }`}
        >
          <Icon size={17} />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={`Enter your ${label.toLowerCase()}`}
          style={{ paddingRight: rightSlot ? '3rem' : '1rem' }}
          className={`w-full pl-11 py-3 text-sm rounded-lg outline-none transition-all duration-200
            bg-gray-50 text-gray-900 placeholder-gray-400 border
            ${error
              ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
              : focused
              ? 'border-indigo-400 bg-white ring-2 ring-indigo-100'
              : 'border-gray-300 hover:border-gray-400'
            }`}
        />
        {rightSlot && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="flex items-center gap-1.5 text-xs font-medium text-red-500"
          >
            <AlertCircle size={12} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Password Strength Meter ───────────────────────────────────── */
function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    { label: 'Min 6 chars',  pass: password.length >= 6 },
    { label: 'Number',       pass: /\d/.test(password) },
    { label: 'Uppercase',    pass: /[A-Z]/.test(password) },
    { label: 'Special char', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score     = checks.filter((c) => c.pass).length;
  const barColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-emerald-500'];
  const labels    = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const textColor = ['', 'text-red-500', 'text-amber-500', 'text-yellow-600', 'text-emerald-600'];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-col gap-2 pt-1"
    >
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? barColors[score] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${textColor[score] || 'text-gray-400'}`}>
          {labels[score] || 'Enter a password'}
        </span>
        <div className="flex items-center gap-1.5">
          {checks.map((c) => (
            <span
              key={c.label}
              title={c.label}
              className={`transition-colors duration-200 ${c.pass ? 'text-emerald-500' : 'text-gray-300'}`}
            >
              <CheckCircle2 size={12} />
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Success Screen ────────────────────────────────────────────── */
function SuccessScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Background />
      <motion.div
        className="flex flex-col items-center gap-5 text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 18 }}
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500 shadow-lg shadow-emerald-200">
          <CheckCircle2 size={40} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Account Created!
          </h2>
          <p className="text-gray-400 text-sm mt-1.5">Redirecting you to login…</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Signup Page ───────────────────────────────────────────────── */
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm]         = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState(false);

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
    if (apiError) setApiError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                           errs.name            = 'Full name is required.';
    else if (form.name.trim().length < 2)            errs.name            = 'Name must be at least 2 characters.';
    if (!form.email.trim())                          errs.email           = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))      errs.email           = 'Please enter a valid email.';
    if (!form.password)                              errs.password        = 'Password is required.';
    else if (form.password.length < 6)               errs.password        = 'Password must be at least 6 characters.';
    if (!form.confirmPassword)                       errs.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    setApiError('');
    try {
      const res  = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name.trim(),
          email:    form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.message || 'Registration failed. Please try again.'); return; }
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2200);
    } catch {
      setApiError('Unable to connect. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return <SuccessScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Background />

      <motion.div
        className="w-full max-w-md md:max-w-lg"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ─────────────── Card ─────────────────────────────────── */}
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-violet-500" />

          {/* Card body */}
          <div className="px-8 pt-9 pb-7 md:px-10 md:pt-10">

            {/* ── Logo block → CENTERED ─────────────────────────── */}
            <div className="flex flex-col items-center text-center mb-8">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-md"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <Brain size={28} color="white" strokeWidth={1.8} />
              </div>
              <h1
                className="text-2xl font-extrabold text-gray-900 tracking-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Cloud<span className="text-indigo-600">ERP</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1 tracking-wide">
                Smart Business Management Platform
              </p>
            </div>

            {/* ── Section heading → LEFT ALIGNED ───────────────── */}
            <div className="mb-7">
              <h2
                className="text-xl font-bold text-gray-800"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Create your account ✨
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Join CloudERP and streamline your business
              </p>
            </div>

            {/* ── API Error Banner ──────────────────────────────── */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200"
                >
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  {apiError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form → full width, left-aligned ─────────────── */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-5">

                {/* Full name */}
                <FormInput
                  id="signup-name"
                  type="text"
                  label="Full name"
                  value={form.name}
                  onChange={handleChange('name')}
                  Icon={User}
                  error={errors.name}
                />

                {/* Email */}
                <FormInput
                  id="signup-email"
                  type="email"
                  label="Email address"
                  value={form.email}
                  onChange={handleChange('email')}
                  Icon={Mail}
                  error={errors.email}
                />

                {/* Password + strength */}
                <div className="flex flex-col gap-1.5">
                  <FormInput
                    id="signup-password"
                    type={showPass ? 'text' : 'password'}
                    label="Password"
                    value={form.password}
                    onChange={handleChange('password')}
                    Icon={Lock}
                    error={errors.password}
                    rightSlot={
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPass(!showPass)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                  <AnimatePresence>
                    {form.password && <PasswordStrength password={form.password} />}
                  </AnimatePresence>
                </div>

                {/* Confirm password */}
                <FormInput
                  id="signup-confirm"
                  type={showConf ? 'text' : 'password'}
                  label="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  Icon={Lock}
                  error={errors.confirmPassword}
                  rightSlot={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConf(!showConf)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />

                {/* Terms */}
                <p className="text-xs text-gray-400">
                  By creating an account you agree to our{' '}
                  <span className="text-indigo-500 hover:underline cursor-pointer">Terms of Service</span>{' '}
                  and{' '}
                  <span className="text-indigo-500 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>

                {/* Submit */}
                <motion.button
                  type="submit"
                  id="signup-submit-btn"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-3 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
                  }}
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> Creating account…</>
                    : <><span>Create my account</span><ArrowRight size={16} /></>
                  }
                </motion.button>
              </div>
            </form>
          </div>

          {/* ── Footer strip → CENTERED ───────────────────────── */}
          <div className="px-8 md:px-10 py-4 bg-gray-50/80 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-2 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Page footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          © 2026 CloudERP · Enterprise Resource Planning · All rights reserved
        </p>
      </motion.div>
    </div>
  );
}
