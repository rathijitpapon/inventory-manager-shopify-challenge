const express = require("express");

const {
    checkCreateWarehouseData,
    checkUpdateWarehouseData,
    checkRemoveWarehouseData,
    checkGetManyWarehousesData,
    checkGetWarehouseData,
} = require("../validations/warehouse");
const {
    createWarehouse,
    updateWarehouse,
    removeWarehouse,
    getManyWarehouses,
    getAllWarehouses,
    getWarehouseByName,
} = require("../controllers/warehouse");

const warehouseRouter = express.Router();

warehouseRouter.post("/create", checkCreateWarehouseData, createWarehouse);

warehouseRouter.put("/:name", checkUpdateWarehouseData, updateWarehouse);

warehouseRouter.delete("/:name", checkRemoveWarehouseData, removeWarehouse);

warehouseRouter.get("/many", checkGetManyWarehousesData, getManyWarehouses);

warehouseRouter.get("/all", getAllWarehouses);

warehouseRouter.get("/:name", checkGetWarehouseData, getWarehouseByName);

module.exports = warehouseRouter;