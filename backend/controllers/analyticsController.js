import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import Employee from '../models/Employee.js';

export const getDashboardAnalytics = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const employeeCount = await Employee.countDocuments();
    
    const financeSummary = await Transaction.aggregate([
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    const revenue = financeSummary.find(f => f._id === 'Income')?.total || 0;
    const expenses = financeSummary.find(f => f._id === 'Expense')?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        inventory: { totalProducts: productCount },
        sales: { totalOrders: orderCount },
        hr: { totalEmployees: employeeCount },
        finance: {
          revenue,
          expenses,
          profit: revenue - expenses
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAIInsights = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
    const pendingOrders = await Order.find({ status: 'Pending' });
    const employees = await Employee.find({ status: 'Active' });

    const insights = [];

    if (lowStockProducts.length > 0) {
      insights.push({
        title: 'Inventory Alert',
        severity: 'critical',
        icon: 'Activity',
        message: `${lowStockProducts.length} items are below safety stock levels. Reorder recommended for ${lowStockProducts[0].name}.`
      });
    }

    if (pendingOrders.length > 0) {
      insights.push({
        title: 'Supply Chain Bottleneck',
        severity: 'warning',
        icon: 'Truck',
        message: `There are ${pendingOrders.length} pending orders that require immediate attention to maintain delivery timelines.`
      });
    }

    insights.push({
      title: 'Workforce Efficiency',
      severity: 'positive',
      icon: 'Users',
      message: `All ${employees.length} active employees are currently assigned to tasks. Productivity is at peak.`
    });

    res.status(200).json({ success: true, data: insights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
