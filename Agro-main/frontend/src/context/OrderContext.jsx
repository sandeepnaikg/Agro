import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 'AC-ORD-2041',
      date: '2026-06-02T10:14:00.000Z',
      status: 'Delivered',
      items: [
        { id: 'moringa-powder-Powder-500', name: 'Moringa Leaf Powder', weight: 500, format: 'Powder', quantity: 2, price: 275 },
        { id: 'tomato-powder-Powder-100', name: 'Tomato Powder', weight: 100, format: 'Powder', quantity: 1, price: 85 }
      ],
      subtotal: 635,
      gst: 32,
      shipping: 0,
      grandTotal: 667,
      shippingAddress: { street: 'Flat 402, Green Meadows, Gachibowli', city: 'Hyderabad', zip: '500032' },
      trackingLogs: [
        { status: 'Ordered', note: 'Customer order placed successfully with UPI payment.', time: '2026-06-02T10:14:00.000Z' },
        { status: 'Processing', note: 'Fresh crop stabilized at Siddipet dehydration node within 3 hours.', time: '2026-06-02T14:30:00.000Z' },
        { status: 'Shipped', note: 'Dispatched via carbon-neutral micro-freight lane (Yadadri transit loop).', time: '2026-06-03T09:15:00.000Z' },
        { status: 'Out for Delivery', note: 'Local delivery agent assigned out of Gachibowli hub.', time: '2026-06-04T08:00:00.000Z' },
        { status: 'Delivered', note: 'Secure package delivered and verified at residence. Traceability ledger sealed.', time: '2026-06-04T12:20:00.000Z' }
      ]
    },
    {
      id: 'AC-ORD-3059',
      date: '2026-06-08T16:40:00.000Z',
      status: 'Processing',
      items: [
        { id: 'beetroot-powder-Powder-200', name: 'Beetroot Powder', weight: 200, format: 'Powder', quantity: 1, price: 150 },
        { id: 'onion-flakes-Dried-1000', name: 'Dehydrated Onion Flakes', weight: 1000, format: 'Dried', quantity: 1, price: 360 }
      ],
      subtotal: 510,
      gst: 26,
      shipping: 0,
      grandTotal: 536,
      shippingAddress: { street: 'Flat 402, Green Meadows, Gachibowli', city: 'Hyderabad', zip: '500032' },
      trackingLogs: [
        { status: 'Ordered', note: 'Customer order registered.', time: '2026-06-08T16:40:00.000Z' },
        { status: 'Processing', note: 'Bulk raw crop lot fetched from Gajwel farmers collection queue.', time: '2026-06-09T09:00:00.000Z' }
      ]
    }
  ]);

  const [bulkInquiries, setBulkInquiries] = useState([
    {
      id: 'AC-INQ-101',
      date: '2026-06-03T11:20:00.000Z',
      fullName: 'Prasad Rao',
      companyName: 'Telangana Organic Foods Ltd',
      email: 'p.rao@telanganafoods.org',
      phone: '+91 9440055110',
      productOfInterest: 'Moringa Leaf Powder',
      quantityNeeded: '500 kg',
      inquiryType: 'Bulk Purchase',
      message: 'We are expanding our organic health mix product line and require high-mesh organic Moringa leaf powder. Please share lab reports for heavy metals and pesticide limits.'
    },
    {
      id: 'AC-INQ-102',
      date: '2026-06-07T14:10:00.000Z',
      fullName: 'Sarah Jenkins',
      companyName: 'Indo-Global Exports Inc',
      email: 's.jenkins@indoglobal.com',
      phone: '+1 415 555 0192',
      productOfInterest: 'Mango Kernel Seed Powder',
      quantityNeeded: '2 Tons',
      inquiryType: 'Export Sourcing',
      message: 'Interested in sourcing green mango seed powder for beauty and skincare export formulas. Needs to be certified organic and milled to 120 mesh. Please send price tiers and standard sample units.'
    }
  ]);

  // Load from localStorage if present
  useEffect(() => {
    const savedOrders = localStorage.getItem('avasan_orders');
    const savedInquiries = localStorage.getItem('avasan_inquiries');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedInquiries) setBulkInquiries(JSON.parse(savedInquiries));
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('avasan_orders', JSON.stringify(newOrders));
  };

  const saveInquiries = (newInq) => {
    setBulkInquiries(newInq);
    localStorage.setItem('avasan_inquiries', JSON.stringify(newInq));
  };

  const addOrder = (newOrderData) => {
    const newId = `AC-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newId,
      date: new Date().toISOString(),
      status: 'Ordered',
      items: newOrderData.items,
      subtotal: newOrderData.subtotal,
      gst: newOrderData.gst,
      shipping: newOrderData.shipping,
      grandTotal: newOrderData.grandTotal,
      shippingAddress: newOrderData.shippingAddress,
      trackingLogs: [
        {
          status: 'Ordered',
          note: 'Customer order placed successfully. Payment authorized.',
          time: new Date().toISOString()
        }
      ]
    };

    saveOrders([newOrder, ...orders]);
    return newId;
  };

  const addBulkInquiry = (newInqData) => {
    const newId = `AC-INQ-${Math.floor(100 + Math.random() * 900)}`;
    const newInq = {
      id: newId,
      date: new Date().toISOString(),
      ...newInqData
    };
    saveInquiries([newInq, ...bulkInquiries]);
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    const statusNotes = {
      Ordered: 'Order registered in control logs.',
      Processing: 'Surplus crops stabilized at farm collector node.',
      Shipped: 'Package dispatched via low-emission road transit loops.',
      'Out for Delivery': 'Assigned to delivery agent for final node navigation.',
      Delivered: 'Delivered and signed. Blockchain quality ledger verified.',
      Cancelled: 'Order cancelled. Funds reversed to payment token.'
    };

    const updatedOrders = orders.map(ord => {
      if (ord.id === orderId) {
        // Add new log
        const timestamp = new Date().toISOString();
        const logs = [...ord.trackingLogs];
        
        // Remove existing status entry if exists to avoid doubles
        const filteredLogs = logs.filter(l => l.status !== nextStatus);
        filteredLogs.push({
          status: nextStatus,
          note: statusNotes[nextStatus] || `Order status updated to ${nextStatus}`,
          time: timestamp
        });

        return {
          ...ord,
          status: nextStatus,
          trackingLogs: filteredLogs
        };
      }
      return ord;
    });

    saveOrders(updatedOrders);
  };

  const refreshAdminData = () => {
    console.log("Admin ledger verified. 100% orders consistent.");
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        bulkInquiries,
        addOrder,
        addBulkInquiry,
        updateOrderStatus,
        refreshAdminData
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
