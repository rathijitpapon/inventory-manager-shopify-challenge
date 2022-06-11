
const checkCreateWarehouseData = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required to create a warehouse',
        });
    }

    next();
}

const checkUpdateWarehouseData = (req, res, next) => {
    const oldName = req.params.name;
    const { newName } = req.body;
    
    if (!oldName) {
        return res.status(400).json({
            message: 'Old name is required to update a warehouse',
        });
    }

    if (!newName) {
        return res.status(400).json({
            message: 'New name is required to update a warehouse',
        });
    }

    if (oldName === newName) {
        return res.status(400).json({
            message: 'Old name and new name must be different to update a warehouse',
        });
    }

    next();
}

const checkRemoveWarehouseData = (req, res, next) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required to delete a warehouse',
        });
    }

    next();
}

const checkGetManyWarehousesData = (req, res, next) => {
    const { limit, offset } = req.query;

    if (!limit) {
        return res.status(400).json({
            message: 'Limit is required to get many warehouses',
        });
    }

    if (!offset) {
        return res.status(400).json({
            message: 'Offset is required to get many warehouses',
        });
    }

    next();
}

const checkGetWarehouseData = (req, res, next) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required to get a warehouse',
        });
    }

    next();
}

module.exports = {
    checkCreateWarehouseData,
    checkUpdateWarehouseData,
    checkRemoveWarehouseData,
    checkGetManyWarehousesData,
    checkGetWarehouseData,
}
