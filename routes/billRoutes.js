/**
 * Bill Routes
 * Handles all HTTP routes related to bills (froshat_details, bill_details, bill_items)
 */

var express = require('express');
var router = express.Router();
var billModel = require('../models/billModel');
var con = require('../config/database');

/**
 * GET /sending_details
 * Get bill items for a specific bill
 */
router.post('/sending_details', function(req, res) {
    var billId = req.query.param;
    
    if (!billId) {
        console.error("No bill ID provided");
        return res.status(400).send("شناسه بل ارسال نشده است");
    }

    console.log("Fetching bill items for bill_id:", billId);
    
    billModel.getBillItems(billId, function(err, rows) {
        console.log("Rows:", rows);
        if (err) {
            console.error("Error querying bill_items:", err);
            return res.status(500).send("خطا در بارگذاری آیتم های بل: " + (err.sqlMessage || err.message));
        }
        
        console.log("Found " + rows.length + " items for bill_id: " + billId);
        var table_data = "";
        var no = 1;
        
        if (rows.length === 0) {
            table_data = "<tr><td colspan='7' style='text-align:center; color:gray;'>هیچ آیتمی ثبت نشده است</td></tr>";
        } else {
            rows.forEach(function(row) {
                if (row && row.item_name) {
                    table_data += "<tr>";
                    table_data += "<td>" + no + "</td>";
                    table_data += "<td>" + (row.item_name || '') + "</td>";
                    table_data += "<td>" + (row.item_type || '') + "</td>";
                    table_data += "<td>" + (row.quantity || 0) + "</td>";
                    table_data += "<td>" + (row.price || 0) + "</td>";
                    var total = parseFloat(row.price || 0) * parseFloat(row.quantity || 0);
                    table_data += "<td>" + total.toFixed(2) + "</td>";
                    table_data += "<td><a onclick='cat_delet1(" + row.id + ")' href='#' style='color:red;'> حذف /</a>     <a onclick='cat_edit(" + row.id + ")' data-toggle='modal' data-target='#basicModal' href=# style='color:green;'>ویرایش</a></td>";
                    table_data += "</tr>";
                    no++;
                } else {
                    console.log("Skipping invalid row:", row);
                }
            });
        }
        
        console.log("Sending table data (length: " + table_data.length + ")");
        res.send(table_data);
    });
});

/**
 * GET /update_bill_details
 * Get bill item for editing
 */
router.post('/update_bill_details', function(req, res) {
    var itemId = req.query.param;
    
    if (!itemId) {
        return res.status(400).send("شناسه آیتم ارسال نشده است");
    }
    
    billModel.getBillItem(itemId, function(err, rows) {
        if (err) {
            return res.status(500).send("خطا در بارگذاری آیتم: " + err.message);
        }
        
        if (!rows || rows.length === 0) {
            return res.status(404).send("آیتم مورد نظر یافت نشد!");
        }
        
        res.send(rows);
    });
});

/**
 * PUT /update_bills_01
 * Update a bill item
 */
router.post('/update_bills_01', function(req, res) {
    var itemId = req.query.bil_id;
    var billId = req.query.fro_id;
    var itemName = req.query.item_name;
    var itemType = req.query.item_type;
    var quantity = req.query.quantity;
    var price = req.query.price;
    
    if (!itemId || !billId) {
        return res.status(400).send("شناسه آیتم یا بل ارسال نشده است");
    }
    
    // First get the current item to calculate stock changes
    billModel.getBillItem(itemId, function(err, currentItem) {
        if (err || !currentItem || currentItem.length === 0) {
            return res.status(500).send("آیتم مورد نظر یافت نشد!");
        }
        
        var oldQuantity = currentItem[0].quantity;
        var oldItemName = currentItem[0].item_name;
        var oldItemType = currentItem[0].item_type;
        
        // Update stock_to_market_lists if needed
        con.query("SELECT * FROM stack_to_market_lists WHERE item_name = ? AND item_type = ?", 
            [oldItemName, oldItemType], 
            function(err, stockRows) {
                if (!err && stockRows && stockRows.length > 0) {
                    var stockQty = stockRows[0].quantity;
                    var updateQty = 0;
                    var newStockQty = stockQty;
                    
                    if (oldQuantity == quantity) {
                        updateQty = 0;
                        newStockQty = stockQty + updateQty;
                    } else if (oldQuantity > quantity) {
                        updateQty = oldQuantity - quantity;
                        newStockQty = stockQty + updateQty;
                    } else if (oldQuantity < quantity) {
                        updateQty = quantity - oldQuantity;
                        newStockQty = stockQty - updateQty;
                    }
                    
                    con.query("UPDATE stack_to_market_lists SET quantity = ? WHERE item_name = ? AND item_type = ?",
                        [newStockQty, oldItemName, oldItemType],
                        function(err) {
                            if (err) {
                                console.error("Error updating stock:", err);
                            }
                        });
                }
                
                // Update the bill item
                billModel.updateBillItem(itemId, {quantity: quantity, price: price}, function(err, result) {
                    if (err) {
                        return res.status(500).send("خطا در بروزرسانی آیتم: " + err.message);
                    }
                    
                    // Recalculate and update bill total
                    billModel.calculateBillTotal(billId, function(err, total) {
                        if (err) {
                            return res.status(500).send("خطا در محاسبه مجموع: " + err.message);
                        }
                        
                        billModel.updateBillTotal(billId, total, function(err) {
                            if (err) {
                                return res.status(500).send("خطا در بروزرسانی مجموع: " + err.message);
                            }
                            res.send("hello success");
                        });
                    });
                });
            });
    });
});

/**
 * DELETE /add_payment_delete_004
 * Delete a bill item
 */
router.post('/add_payment_delete_004', function(req, res) {
    var itemId = req.query.bill_detail_id;
    
    if (!itemId) {
        return res.status(400).send("شناسه آیتم ارسال نشده است");
    }
    
    // Get item details before deletion
    billModel.getBillItem(itemId, function(err, itemRows) {
        if (err || !itemRows || itemRows.length === 0) {
            return res.status(500).send("آیتم مورد نظر یافت نشد!");
        }
        
        var item = itemRows[0];
        var itemName = item.item_name;
        var itemType = item.item_type;
        var quantity = item.quantity;
        var billDetailId = item.bill_detail_id;
        var billId = item.bill_id;
        
        // Update stack_to_market
        con.query("SELECT * FROM stack_to_market WHERE item_name = ? AND item_type = ?",
            [itemName, itemType],
            function(err, stockRows) {
                if (!err && stockRows && stockRows.length > 0) {
                    var stockQty = stockRows[0].quantity;
                    var newStockQty = parseFloat(stockQty) + parseFloat(quantity);
                    
                    con.query("UPDATE stack_to_market SET quantity = ? WHERE item_name = ? AND item_type = ?",
                        [newStockQty, itemName, itemType],
                        function(err) {
                            if (err) {
                                console.error("Error updating stock:", err);
                            }
                        });
                }
                
                // Delete the bill item
                billModel.deleteBillItem(itemId, function(err, result) {
                    if (err) {
                        return res.status(500).send("خطا در حذف آیتم: " + err.message);
                    }
                    
                    // Check if bill_detail has any remaining items
                    billModel.countBillItems(billDetailId, function(err, count) {
                        if (!err && count === 0) {
                            // No more items, delete the bill_detail
                            billModel.deleteBillDetail(billDetailId, function(err) {
                                if (err) {
                                    console.error("Error deleting bill_detail:", err);
                                } else {
                                    console.log("Deleted empty bill_detail: " + billDetailId);
                                }
                            });
                        }
                        
                        // Recalculate and update bill total
                        billModel.calculateBillTotal(billId, function(err, total) {
                            if (err) {
                                return res.status(500).send("خطا در محاسبه مجموع: " + err.message);
                            }
                            
                            billModel.updateBillTotal(billId, total, function(err) {
                                if (err) {
                                    return res.status(500).send("خطا در بروزرسانی مجموع: " + err.message);
                                }
                                res.send("hello");
                            });
                        });
                    });
                });
            });
    });
});

module.exports = router;
