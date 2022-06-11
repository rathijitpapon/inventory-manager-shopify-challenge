const express = require("express");

const {
    checkCreateInventoryData,
    checkUpdateInventoryData,
    checkRemoveInventoryData,
    checkGetManyInventoriesData,
    checkGetInventoryData,
} = require("../validations/inventory");
const {
    createInventory,
    updateInventory,
    removeInventory,
    getManyInventories,
    getAllInventories,
    getInventoryById,
} = require("../controllers/inventory");

const inventoryRouter = express.Router();

inventoryRouter.post("/create", checkCreateInventoryData, createInventory);

inventoryRouter.put("/:id", checkUpdateInventoryData, updateInventory);

inventoryRouter.delete("/:id", checkRemoveInventoryData, removeInventory);

inventoryRouter.get("/many", checkGetManyInventoriesData, getManyInventories);

inventoryRouter.get("/all", getAllInventories);

inventoryRouter.get("/:id", checkGetInventoryData, getInventoryById);

module.exports = inventoryRouter;