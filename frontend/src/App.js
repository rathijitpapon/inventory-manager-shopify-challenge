import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Table} from 'react-bootstrap';
import {Modal, Fade, Backdrop} from '@material-ui/core';

import './App.css';

import inventoryService from './services/inventoryService'
import warehouseService from './services/warehouseService';

const App = () => {

  const [currentContent, setCurrentContent] = useState('Inventory');
  const [inventories, setInventories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [openInventoryModal, setOpenInventoryModal] = useState(false);
  const [openWarehouseModal, setOpenWarehouseModal] = useState(false);

  const [inventoryObject, setInventoryObject] = useState({
    id: '',
    name: '',
    price: '',
    quantity: '',
    warehouseId: '',
    updateType: '',
  });

  const [warehouseObject, setWarehouseObject] = useState({
    oldName: '',
    newName: '',
    updateType: '',
  });

  const generateToastError = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }

  const generateToastSuccess = (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }

  const updateInventory = async () => {
    if (!inventoryObject.name) {
      generateToastError("Name is required");
      return;
    }

    if (!inventoryObject.price) {
      generateToastError("Valid price is required");
      return;
    }

    if (!inventoryObject.quantity) {
      generateToastError("Valid quantity is required");
      return;
    }

    if (!inventoryObject.warehouseId) {
      generateToastError("Warehouse is required");
      return;
    }

    if (inventoryObject.updateType === 'Add') {
      const response = await inventoryService.createInventory(inventoryObject.name, inventoryObject.price, inventoryObject.quantity, inventoryObject.warehouseId);
      if (response.status < 400) {
        generateToastSuccess('Inventory added successfully');
        setOpenInventoryModal(false);
        setInventoryObject({
          id: '',
          name: '',
          price: '',
          quantity: '',
          warehouseId: '',
          updateType: '',
        });
      } else {
        generateToastError(response.message);
      }
    }

    if (inventoryObject.updateType === 'Update') {
      const response = await inventoryService.updateInventory(inventoryObject.id, inventoryObject.name, inventoryObject.price, inventoryObject.quantity, inventoryObject.warehouseId);
      if (response.status < 400) {
        generateToastSuccess('Inventory updated successfully');
        setOpenInventoryModal(false);
        setInventoryObject({
          id: '',
          name: '',
          price: '',
          quantity: '',
          warehouseId: '',
          updateType: '',
        });
      } else {
        generateToastError(response.message);
      }
    }

    await fetchData();
  }

  const updateWarehouse = async () => {
    if (warehouseObject.newName === '') {
      generateToastError('Warehouse name cannot be empty');
      return;
    }

    if (warehouseObject.updateType === 'Add') {
      const response = await warehouseService.createWarehouse(warehouseObject.newName);
      if (response.status < 400) {
        generateToastSuccess('Warehouse added successfully');
        setWarehouseObject({
          oldName: '',
          newName: '',
          updateType: '',
        });
        setOpenWarehouseModal(false);
      }
      else {
        generateToastError(response.message);
      }
    }

    if (warehouseObject.updateType === 'Update') {
      const response = await warehouseService.updateWarehouse(warehouseObject.oldName, warehouseObject.newName);
      if (response.status < 400) {
        generateToastSuccess('Warehouse updated successfully');
        setWarehouseObject({
          oldName: '',
          newName: '',
          updateType: '',
        });
        setOpenWarehouseModal(false);
      }
      else {
        generateToastError(response.message);
      }
    }

    await fetchData();
  }

  const removeInventory = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this inventory?');

    if (!confirmation) {
      return;
    }

    const response = await inventoryService.removeInventory(id);
    if (response.status < 400) {
      generateToastSuccess('Inventory deleted successfully');
    } else {
      generateToastError(response.message);
    }

    await fetchData();
  }

  const removeWarehouse = async (name) => {
    const confirmation = window.confirm('Are you sure you want to delete this warehouse? All related inventories will be deleted as well.');

    if (!confirmation) {
      return;
    }

    const response = await warehouseService.removeWarehouse(name);
    if (response.status < 400) {
      generateToastSuccess('Warehouse deleted successfully');
    } else {
      generateToastError(response.message);
    }

    await fetchData();
  }

  const fetchData = async () => {
    let response = await warehouseService.getAllWarehouses();

    if (response.status >= 400) {
      generateToastError(response.message);
    }
    else {
      setWarehouses(response.data);
    }

    response = await inventoryService.getAllInventories();

    if (response.status >= 400) {
      generateToastError(response.message);
    }
    else {
      setInventories(response.data);
    }
  }

  useEffect(() => {
      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="app-container">
      <ToastContainer />
      <div className="app-title">Inventory Manager</div>

      <div className="content-header-container">
        <div 
          className={"content-header-item " + (currentContent === "Inventory" ? "content-header-item-focused" : "")} 
          onClick={() => setCurrentContent('Inventory')}
        >
          Inventory
        </div>
        <div 
          className={"content-header-item " + (currentContent === "Warehouse" ? "content-header-item-focused" : "")} 
          onClick={() => setCurrentContent('Warehouse')}
          >
            Warehouse
          </div>
      </div>

      {
        currentContent === "Inventory" ?
        (<>
          <Modal
            open={openInventoryModal}
            onClose={() => setOpenInventoryModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
          >
            <Fade in={openInventoryModal}>
              <div className="add-modal-body">
                <div className="add-modal-title">{inventoryObject.updateType} Inventory</div>
                <div className="add-modal-content">
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-label">Name</div>
                    <input 
                      className="add-modal-content-item-input" 
                      type="text" 
                      value={inventoryObject.name}
                      onChange={(e) => setInventoryObject({...inventoryObject, name: e.target.value})}
                    />
                  </div>
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-label">Price</div>
                    <input 
                      className="add-modal-content-item-input" 
                      type="number" 
                      value={inventoryObject.price || ''}
                      onChange={(e) => setInventoryObject({...inventoryObject, price: parseInt(e.target.value || 0)})}
                    />
                  </div>
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-label">Quantity</div>
                    <input 
                      className="add-modal-content-item-input" 
                      type="number" 
                      value={inventoryObject.quantity || ''}
                      onChange={(e) => setInventoryObject({...inventoryObject, quantity: parseInt(e.target.value || 0)})}
                    />
                  </div>
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-label">Warehouse</div>
                    <select 
                      className="add-modal-content-item-input"
                      onChange={(e) => setInventoryObject({...inventoryObject, warehouseId: e.target.value})}
                      value={inventoryObject.warehouseId}
                    >
                      {
                        warehouses.map((warehouse) => (
                          <option key={warehouse._id} value={warehouse._id}>{warehouse.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-button" onClick={updateInventory}>Save</div>
                  </div>
                </div>
              </div>
            </Fade>
        </Modal>
          <div className="add-container">
            <div 
              className="add-button" 
              onClick={() => {
                if (warehouses.length === 0) {
                  generateToastError('Please add warehouse first');
                  return;
                }
                setInventoryObject({
                  id: '',
                  name: '',
                  price: '',
                  quantity: '',
                  warehouseId: warehouses[0]._id,
                  warehouse: warehouses[0].name,
                  updateType: 'Add',
                });
                setOpenInventoryModal(true)
              }}
            >
              Add Inventory
            </div>
          </div>
          

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="table-item">ID</th>
                <th className="table-item">Name</th>
                <th className="table-item">Price</th>
                <th className="table-item">Quantity</th>
                <th className="table-item">Warehouse</th>
                <th className="table-item" colSpan="2">Options</th>
              </tr>
            </thead>
            <tbody>
              {
                inventories.map(inventory => (
                  <tr key={inventory.inventoryId}>
                    <td className="table-item">#{inventory.inventoryId}</td>
                    <td className="table-item">{inventory.name}</td>
                    <td className="table-item">${inventory.price}</td>
                    <td className="table-item">{inventory.quantity}</td>
                    <td className="table-item">{inventory.warehouse.name}</td>
                    <td className="table-item update-item" onClick={() => {
                      setInventoryObject({
                        id: inventory.inventoryId,
                        name: inventory.name,
                        price: parseInt(inventory.price),
                        quantity: parseInt(inventory.quantity),
                        warehouseId: inventory.warehouse._id,
                        warehouse: inventory.warehouse.name,
                        updateType: "Update"
                      });
                      setOpenInventoryModal(true);
                    }}>Update</td>
                    <td className="table-item update-item" onClick={() => removeInventory(inventory.inventoryId)}>Delete</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>  
        </>) : null
      } 

            {
        currentContent === "Warehouse" ?
        (<>
          <Modal
            open={openWarehouseModal}
            onClose={() => setOpenWarehouseModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
          >
            <Fade in={openWarehouseModal}>
              <div className="add-modal-body">
                <div className="add-modal-title">{warehouseObject.updateType} Warehouse</div>
                <div className="add-modal-content">
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-label">Name</div>
                    <input 
                      className="add-modal-content-item-input" 
                      type="text" 
                      value={warehouseObject.newName}
                      onChange={(e) => setWarehouseObject({...warehouseObject, newName: e.target.value})}
                    />
                  </div>
                  <div className="add-modal-content-item">
                    <div className="add-modal-content-item-button" onClick={updateWarehouse}>Save</div>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
          <div className="add-container">
            <div 
              className="add-button" 
              onClick={() => {
                setOpenWarehouseModal(true)
                setWarehouseObject({
                  oldName: "",
                  newName: "",
                  updateType: "Add"
                })
              }}
            >
              Add Warehouse
            </div>
          </div>
          

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="table-item">Name</th>
                <th className="table-item" colSpan="2">Options</th>
              </tr>
            </thead>
            <tbody>
              {
                warehouses.map(warehouse => (
                  <tr key={warehouse.name}>
                    <td className="table-item">{warehouse.name}</td>
                    <td className="table-item update-item" onClick={() => {
                      setWarehouseObject({
                        oldName: warehouse.name,
                        newName: warehouse.name,
                        updateType: "Update"
                      });
                      setOpenWarehouseModal(true);
                    }}>Update</td>
                    <td className="table-item update-item" onClick={() => removeWarehouse(warehouse.name)}>Delete</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>  
        </>) : null
      }  
    </div>
  );
}

export default App;
