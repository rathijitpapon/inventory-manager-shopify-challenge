const shortid = require('shortid');

const Inventory = require('../models/inventory');
const Warehouse = require('../models/warehouse');

const createInventory = async (req, res) => {
    try {
        const {
            name,
            price,
            quantity,
            warehouseId,
        } = req.body;

        // Create Unique Inventory ID
        const inventoryId = await shortid.generate();

        // Check if warehouse exists
        const warehouse = await Warehouse.findOne({_id: warehouseId});

        if (!warehouse) {
            return res.status(400).json({
                message: 'Warehouse not found',
            });
        }

        // Create new inventory
        const inventory = new Inventory({
            inventoryId,
            name,
            price,
            quantity,
            warehouse: warehouse._id,
        });

        await inventory.save();
        await inventory.populate('warehouse');

        res.status(200).send(inventory);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const updateInventory = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, price, quantity, warehouseId} = req.body;

        // Check if inventory exists 
        const inventory = await Inventory.findOne({
            inventoryId: id,
        });

        if (!inventory) {
            return res.status(400).json({
                message: 'Inventory not found',
            });
        }

        // Check if warehouse exists
        const warehouse = await Warehouse.findOne({_id: warehouseId});

        if (!warehouse) {
            return res.status(400).json({
                message: 'Warehouse not found',
            });
        }

        // Update inventory
        inventory.name = name;
        inventory.price = price;
        inventory.quantity = quantity;
        inventory.warehouse = warehouse._id;

        await inventory.save();
        await inventory.populate('warehouse');

        res.status(200).send(inventory);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const removeInventory = async (req, res) => {
    try {
        const {id} = req.params;

        // Delete inventory
        const inventory = await Inventory.findOneAndDelete({inventoryId: id});

        res.status(200).send(inventory);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getManyInventories = async (req, res) => {
    try {
        const {limit, offset} = req.query;

        // Get inventories using limit and offset
        const inventories = await Inventory.find({}).limit(parseInt(limit)).skip(parseInt(offset)).populate('warehouse');

        res.status(200).send(inventories);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllInventories = async (req, res) => {
    try {
        // Get all inventories
        const inventories = await Inventory.find({}).populate('warehouse');

        res.status(200).send(inventories);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getInventoryById = async (req, res) => {
    try {
        const {id} = req.params;

        // Get inventory by id & Check if it exists
        const inventory = await Inventory.findOne({inventoryId: id}).populate('warehouse');

        if (!inventory) {
            return res.status(400).json({
                message: 'Inventory not found',
            });
        }

        res.status(200).send(inventory);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    createInventory,
    updateInventory,
    removeInventory,
    getManyInventories,
    getAllInventories,
    getInventoryById
};