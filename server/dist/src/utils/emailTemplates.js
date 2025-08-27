"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderEmail = exports.orderCancelledTemplate = exports.orderDeliveredTemplate = exports.orderActiveTemplate = exports.orderCreatedTemplate = void 0;
// ========================
// Customer Templates (with full details)
// ========================
const buildOrderDetails = (sale) => {
    const items = (sale === null || sale === void 0 ? void 0 : sale.items) || []; // Prisma includes items in sale
    const productList = items.length > 0
        ? items
            .map((item) => {
            var _a;
            return `<li>${((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || "Unknown Product"} — Qty: ${item.quantity || 0} — $${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</li>`;
        })
            .join("")
        : "<li>No products found in this order</li>";
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    return `
    <h3>🛍️ Order Details</h3>
    <ul style="padding-left: 20px; color: #555;">
      ${productList}
    </ul>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    <p><strong>Shipping Address:</strong> ${(sale === null || sale === void 0 ? void 0 : sale.address) || "N/A"}</p>
    <p><strong>Phone:</strong> ${(sale === null || sale === void 0 ? void 0 : sale.phone) || "N/A"}</p>
    <p><strong>Email:</strong> ${(sale === null || sale === void 0 ? void 0 : sale.email) || "N/A"}</p>
  `;
};
// ========================
// Status Templates
// ========================
const orderCreatedTemplate = (sale) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: #0d6efd; color: #fff; padding: 16px; text-align: center;">
      <h2>🛒 Thank you for your order, ${(sale === null || sale === void 0 ? void 0 : sale.customerName) || "Customer"}!</h2>
    </div>
    <div style="padding: 20px; color: #333;">
      <p>Your order <strong>#${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"}</strong> has been received and is being processed.</p>
      ${buildOrderDetails(sale)}
      <p><strong>Note:</strong> You can cancel your order within 24 hours by replying to this email with "Cancel" and your order number. Cancellations after 24 hours may incur fees.</p>
    </div>
    <div style="background: #f8f9fa; padding: 12px; text-align: center; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Abby Stores. All rights reserved.
    </div>
  </div>
`;
exports.orderCreatedTemplate = orderCreatedTemplate;
const orderActiveTemplate = (sale) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: #ffc107; color: #000; padding: 16px; text-align: center;">
      <h2>📦 Your order is being prepared!</h2>
    </div>
    <div style="padding: 20px; color: #333;">
      <p>Your order <strong>#${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"}</strong> is now active and being packaged.</p>
      ${buildOrderDetails(sale)}
    </div>
    <div style="background: #f8f9fa; padding: 12px; text-align: center; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Abby Stores. All rights reserved.
    </div>
  </div>
`;
exports.orderActiveTemplate = orderActiveTemplate;
const orderDeliveredTemplate = (sale) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: #28a745; color: #fff; padding: 16px; text-align: center;">
      <h2>✅ Order Delivered!</h2>
    </div>
    <div style="padding: 20px; color: #333;">
      <p>Your order <strong>#${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"}</strong> has been delivered. 🎉</p>
      ${buildOrderDetails(sale)}
      <p>We hope you enjoy your purchase. Don’t forget to leave us a review!</p>
    </div>
    <div style="background: #f8f9fa; padding: 12px; text-align: center; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Abby Stores. All rights reserved.
    </div>
  </div>
`;
exports.orderDeliveredTemplate = orderDeliveredTemplate;
const orderCancelledTemplate = (sale) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: #dc3545; color: #fff; padding: 16px; text-align: center;">
      <h2>❌ Order Cancelled</h2>
    </div>
    <div style="padding: 20px; color: #333;">
      <p>Your order <strong>#${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"}</strong> has been cancelled.</p>
      ${buildOrderDetails(sale)}
      <p>If this was a mistake, please contact our support team.</p>
    </div>
    <div style="background: #f8f9fa; padding: 12px; text-align: center; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} Abby Stores. All rights reserved.
    </div>
  </div>
`;
exports.orderCancelledTemplate = orderCancelledTemplate;
// ========================
// Builder Wrapper
// ========================
const buildOrderEmail = (sale, status) => {
    let subject = "";
    let html = "";
    switch (status) {
        case "created":
            subject = `Order #${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"} Confirmation`;
            html = (0, exports.orderCreatedTemplate)(sale);
            break;
        case "active":
            subject = `Order #${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"} is now Active`;
            html = (0, exports.orderActiveTemplate)(sale);
            break;
        case "delivered":
            subject = `Order #${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"} Delivered 🎉`;
            html = (0, exports.orderDeliveredTemplate)(sale);
            break;
        case "cancelled":
            subject = `Order #${(sale === null || sale === void 0 ? void 0 : sale.id) || "N/A"} Cancelled`;
            html = (0, exports.orderCancelledTemplate)(sale);
            break;
    }
    return { subject, html };
};
exports.buildOrderEmail = buildOrderEmail;
