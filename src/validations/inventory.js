
const checkCreateInventoryData = (req, res, next) => {
    const { name, price, quantity, warehouseId } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required to create a inventory',
        });
    }

    if (!price) {
        return res.status(400).json({
            message: 'Price is required to create a inventory',
        });
    }

    if (!quantity) {
        return res.status(400).json({
            message: 'Quantity is required to create a inventory',
        });
    }

    if (!warehouseId) {
        return res.status(400).json({
            message: 'Warehouse is required to create a inventory',
        });
    }

    next();
}

const checkUpdateInventoryData = (req, res, next) => {
    const { id } = req.params;
    const { name, price, quantity, warehouseId } = req.body;
    
    if (!id) {
        return res.status(400).json({
            message: 'Inventory id is required to update a inventory',
        });
    }

    if (!name) {
        return res.status(400).json({
            message: 'Name is required to update a inventory',
        });
    }

    if (!price) {
        return res.status(400).json({
            message: 'Price is required to update a inventory',
        });
    }

    if (!quantity) {
        return res.status(400).json({
            message: 'Quantity is required to update a inventory',
        });
    }

    if (!warehouseId) {
        return res.status(400).json({
            message: 'Warehouse is required to update a inventory',
        });
    }

    next();
}

const checkRemoveInventoryData = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'Inventory id is required to delete a inventory',
        });
    }

    next();
}

const checkGetManyInventoriesData = (req, res, next) => {
    const { limit, offset } = req.query;
    
    if (!limit) {
        return res.status(400).json({
            message: 'Limit is required to get many inventories',
        });
    }

    if (!offset) {
        return res.status(400).json({
            message: 'Offset is required to get many inventories',
        });
    }

    next();
}

const checkGetInventoryData = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'Inventory id is required to get a inventory',
        });
    }

    next();
}

module.exports = {
    checkCreateInventoryData,
    checkUpdateInventoryData,
    checkRemoveInventoryData,
    checkGetManyInventoriesData,
    checkGetInventoryData,
}
