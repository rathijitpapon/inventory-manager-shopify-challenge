import axios from "axios";
import config from "../config/config.json";

const baseURL = config.apiBaseURL + "/api/inventory";

const createInventory = (name, price, quantity, warehouseId) => {
    const url = `${baseURL}/create`;
    
    const response = axios.post(url, {
        name, price, quantity, warehouseId
    }).then(res => {
        return {
            status: res.status,
            data: res.data,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const updateInventory = (inventoryId, name, price, quantity, warehouseId) => {
    const url = `${baseURL}/${inventoryId}`;

    const response = axios.put(url, {
        name, price, quantity, warehouseId
    }).then(res => {
        return {
            status: res.status,
            data: res.data,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const removeInventory = (inventoryId) => {
    const url = `${baseURL}/${inventoryId}`;

    const response = axios.delete(url, {}).then(res => {
        return {
            status: res.status,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const getManyInventories = (limit, offset) => {
    const url = `${baseURL}/many?limit=${limit}&offset=${offset}`;

    const response = axios.get(url, {}).then(res => {
        return {
            status: res.status,
            data: res.data,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const getAllInventories = () => {
    const url = `${baseURL}/all`;

    const response = axios.get(url, {}).then(res => {
        return {
            status: res.status,
            data: res.data,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const getInventoryById = (inventoryId) => {
    const url = `${baseURL}/${inventoryId}`;
    
    const response = axios.get(url, {}).then(res => {
        return {
            status: res.status,
            data: res.data,
        };
    }).catch(error => {
        if(error.response && error.response.status < 500) {
            return {
                status: error.response.status,
                message: error.response.message,
            };
        }
        return {
            status: 500,
            message: "Unexpected server error",
        };
    });

    return response;
};

const inventoryService = {
    createInventory,
    updateInventory,
    removeInventory,
    getManyInventories,
    getAllInventories,
    getInventoryById,
};

export default inventoryService;