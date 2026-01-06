/**
 * Bill Database Operations
 * Contains all database queries related to bills (froshat_details, bill_details, bill_items)
 */

var con = require('../config/database');

var billModel = {
    /**
     * Get bill items by bill_id
     * @param {number} billId - The froshat_details.id
     * @param {function} callback - Callback function (err, rows)
     */
    getBillItems: function(billId, callback) {
        // First try to get from bill_items (newer structure)
        var query = "SELECT bill_items.*, bill_details.bill_id FROM bill_items " +
                    "INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id " +
                    "WHERE bill_details.bill_id = ?";
        con.query(query, [billId], function(err, rows) {
            if (err) {
                console.error("Error getting bill items:", err);
                return callback(err, null);
            }
            
            // If bill_items has data, return it
            if (rows && rows.length > 0) {
                return callback(null, rows);
            }
            
            // Otherwise, fallback to bill_details (older structure)
            console.log("No items found in bill_items for bill_id " + billId + ", checking bill_details...");
            var fallbackQuery = "SELECT id, bill_id, item_name, item_type, quantity, price, 0 as thickness FROM bill_details WHERE bill_id = ?";
            con.query(fallbackQuery, [billId], function(err2, rows2) {
                if (err2) {
                    console.error("Error getting bill details:", err2);
                    return callback(err2, null);
                }
                console.log("Found " + (rows2 ? rows2.length : 0) + " items in bill_details for bill_id: " + billId);
                callback(null, rows2 || []);
            });
        });
    },

    /**
     * Get bill detail by id
     * @param {number} billDetailId - The bill_details.id
     * @param {function} callback - Callback function (err, rows)
     */
    getBillDetail: function(billDetailId, callback) {
        var query = "SELECT * FROM bill_details WHERE id = ?";
        con.query(query, [billDetailId], callback);
    },

    /**
     * Get bill item by id (with bill_id)
     * @param {number} itemId - The bill_items.id
     * @param {function} callback - Callback function (err, rows)
     */
    getBillItem: function(itemId, callback) {
        var query = "SELECT bill_items.*, bill_details.bill_id FROM bill_items " +
                    "INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id " +
                    "WHERE bill_items.id = ?";
        con.query(query, [itemId], callback);
    },

    /**
     * Insert bill detail
     * @param {object} data - {bill_id, item_name, item_type, quantity, price}
     * @param {function} callback - Callback function (err, result)
     */
    insertBillDetail: function(data, callback) {
        var query = "INSERT INTO bill_details (bill_id, item_name, item_type, quantity, price) VALUES (?, ?, ?, ?, ?)";
        con.query(query, [data.bill_id, data.item_name, data.item_type, data.quantity, data.price], callback);
    },

    /**
     * Insert bill item
     * @param {object} data - {bill_detail_id, item_name, item_type, quantity, price, thickness}
     * @param {function} callback - Callback function (err, result)
     */
    insertBillItem: function(data, callback) {
        var query = "INSERT INTO bill_items (bill_detail_id, item_name, item_type, quantity, price, thickness) VALUES (?, ?, ?, ?, ?, ?)";
        var thickness = data.thickness || 0;
        con.query(query, [data.bill_detail_id, data.item_name, data.item_type, data.quantity, data.price, thickness], callback);
    },

    /**
     * Update bill item
     * @param {number} itemId - The bill_items.id
     * @param {object} data - {quantity, price, thickness}
     * @param {function} callback - Callback function (err, result)
     */
    updateBillItem: function(itemId, data, callback) {
        var query = "UPDATE bill_items SET quantity = ?, price = ?, thickness = ? WHERE id = ?";
        var thickness = data.thickness !== undefined ? data.thickness : 0;
        con.query(query, [data.quantity, data.price, thickness, itemId], callback);
    },

    /**
     * Delete bill item
     * @param {number} itemId - The bill_items.id
     * @param {function} callback - Callback function (err, result)
     */
    deleteBillItem: function(itemId, callback) {
        var query = "DELETE FROM bill_items WHERE id = ?";
        con.query(query, [itemId], callback);
    },

    /**
     * Calculate total amount for a bill
     * @param {number} billId - The froshat_details.id
     * @param {function} callback - Callback function (err, total)
     */
    calculateBillTotal: function(billId, callback) {
        var query = "SELECT SUM(bill_items.price * bill_items.quantity) as total " +
                    "FROM bill_items " +
                    "INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id " +
                    "WHERE bill_details.bill_id = ?";
        con.query(query, [billId], function(err, rows) {
            if (err) {
                return callback(err, null);
            }
            var total = rows && rows[0] ? (rows[0].total || 0) : 0;
            callback(null, total);
        });
    },

    /**
     * Update bill total amount
     * @param {number} billId - The froshat_details.id
     * @param {number} totalAmount - The total amount
     * @param {function} callback - Callback function (err, result)
     */
    updateBillTotal: function(billId, totalAmount, callback) {
        var query = "UPDATE froshat_details SET total_amount = ? WHERE id = ?";
        con.query(query, [totalAmount, billId], callback);
    },

    /**
     * Check if bill_detail has any items
     * @param {number} billDetailId - The bill_details.id
     * @param {function} callback - Callback function (err, count)
     */
    countBillItems: function(billDetailId, callback) {
        var query = "SELECT COUNT(*) as item_count FROM bill_items WHERE bill_detail_id = ?";
        con.query(query, [billDetailId], function(err, rows) {
            if (err) {
                return callback(err, null);
            }
            var count = rows && rows[0] ? rows[0].item_count : 0;
            callback(null, count);
        });
    },

    /**
     * Delete bill detail
     * @param {number} billDetailId - The bill_details.id
     * @param {function} callback - Callback function (err, result)
     */
    deleteBillDetail: function(billDetailId, callback) {
        var query = "DELETE FROM bill_details WHERE id = ?";
        con.query(query, [billDetailId], callback);
    }
};

module.exports = billModel;
