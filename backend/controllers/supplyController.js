import Order from '../models/Order.js';
import Contact from '../models/Contact.js';
import Product from '../models/Product.js';
import Transaction from '../models/Transaction.js';

// --- Contact Management ---

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- Order Management ---

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('contact', 'name company').populate('items.product', 'name sku');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { orderNumber, contact, items, totalAmount, type } = req.body;

    // Create the order
    const order = await Order.create(req.body);

    // Update stock levels
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        if (type === 'Purchase') {
          product.stock += item.quantity;
        } else if (type === 'Sales') {
          product.stock -= item.quantity;
        }
        await product.save();
      }
    }

    // Create a financial transaction
    await Transaction.create({
      description: `${type} Order: ${orderNumber}`,
      amount: totalAmount,
      type: type === 'Sales' ? 'Income' : 'Expense',
      category: type === 'Sales' ? 'Sales Revenue' : 'Inventory Purchase',
      reference: order._id,
      date: order.orderDate
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
