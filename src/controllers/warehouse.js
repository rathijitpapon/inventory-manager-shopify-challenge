const Warehouse = require('../models/warehouse');
const Inventory = require('../models/inventory');

const createWarehouse = async (req, res) => {
    try {
        const {name} = req.body;

        // Create new warehouse
        const warehouse = new Warehouse({name});

        await warehouse.save();

        res.status(200).send(warehouse);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const updateWarehouse = async (req, res) => {
    try {
        const oldName = req.params.name;
        const { newName } = req.body;

        // Check if warehouse exists
        const warehouse = await Warehouse.findOne({name: oldName});

        if (!warehouse) {
            return res.status(400).json({
                message: 'Warehouse not found',
            });
        }

        // Update warehouse
        warehouse.name = newName;
        await warehouse.save();

        res.status(200).send(warehouse);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const removeWarehouse = async (req, res) => {
    try {
        const {name} = req.params;

        // Check if warehouse exists
        const warehouse = await Warehouse.findOne({name});

        if (!warehouse) {
            return res.status(400).json({
                message: 'Warehouse not found',
            });
        }

        // Remove all inventories from warehouse
        const inventories = await Inventory.find({warehouse: warehouse._id});
        for (let i = 0; i < inventories.length; i++) {
            await Inventory.findByIdAndDelete(inventories[i]._id);
        }
        
        // Remove warehouse
        await Warehouse.findByIdAndDelete(warehouse._id);

        res.status(200).send({
            message: 'Warehouse deleted successfully',
        });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getManyWarehouses = async (req, res) => {
    try {
        const {limit, offset} = req.query;

        // Get warehouses using limit and offset
        const warehouses = await Warehouse.find({}).limit(parseInt(limit)).skip(parseInt(offset));

        res.status(200).send(warehouses);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllWarehouses = async (req, res) => {
    try {
        // Get all warehouses
        const warehouses = await Warehouse.find({});
        
        res.status(200).send(warehouses);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getWarehouseByName = async (req, res) => {
    try {
        const {name} = req.params;

        // Check if warehouse exists
        const warehouse = await Warehouse.findOne({name});

        if (!warehouse) {
            return res.status(400).json({
                message: 'Warehouse not found',
            });
        }

        res.status(200).send(warehouse);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    createWarehouse,
    updateWarehouse,
    removeWarehouse,
    getManyWarehouses,
    getAllWarehouses,
    getWarehouseByName
};