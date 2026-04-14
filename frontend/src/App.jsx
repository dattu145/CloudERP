import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/finance/Finance';
import Accounts from './pages/finance/Accounts';
import Payroll from './pages/finance/Payroll';
import Employees from './pages/hr/Employees';
import Profiles from './pages/hr/Profiles';
import Inventory from './pages/inventory/Inventory';
import SupplyChain from './pages/supply/SupplyChain';
import Orders from './pages/supply/Orders';
import Reports from './pages/reports/Reports';
import AIInsights from './pages/AIInsights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Finance */}
          <Route path="finance"          element={<Finance />} />
          <Route path="finance/accounts" element={<Accounts />} />
          <Route path="finance/payroll"  element={<Payroll />} />

          {/* HR */}
          <Route path="hr"          element={<Employees />} />
          <Route path="hr/profiles" element={<Profiles />} />

          {/* Inventory */}
          <Route path="inventory" element={<Inventory />} />

          {/* Supply Chain */}
          <Route path="supply"        element={<SupplyChain />} />
          <Route path="supply/orders" element={<Orders />} />

          {/* Reports & AI */}
          <Route path="reports" element={<Reports />} />
          <Route path="ai"      element={<AIInsights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
