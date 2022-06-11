import axios from "axios";
import config from "../config/config.json";

const baseURL = config.apiBaseURL + "/api/warehouse";

const createWarehouse = (name) => {
    const url = `${baseURL}/create`;
    
    const response = axios.post(url, {
        name
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

const updateWarehouse = (oldName, newName) => {
    const url = `${baseURL}/${oldName}`;

    const response = axios.put(url, {
        newName
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

const removeWarehouse = (name) => {
    const url = `${baseURL}/${name}`;

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

const getManyWarehouses = (limit, offset) => {
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

const getAllWarehouses = () => {
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
}

const getWarehouseByName = (name) => {
    const url = `${baseURL}/${name}`;
    
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

const warehouseService = {
    createWarehouse,
    updateWarehouse,
    removeWarehouse,
    getManyWarehouses,
    getAllWarehouses,
    getWarehouseByName,
};

export default warehouseService;