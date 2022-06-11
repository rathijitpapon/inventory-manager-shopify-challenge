const express = require("express");
const cors = require("cors");
const path = require("path");

const initDB = require("./db/mongoose");

const inventoryRouter = require("./routes/inventory");
const warehouseRouter = require("./routes/warehouse");

var corsOptions = {
    origin: "*",
};

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

initDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cors(corsOptions));

app.use("/api/inventory", inventoryRouter);
app.use("/api/warehouse", warehouseRouter);


// Load Frontend
const loc = __dirname + '/../frontend/build'

app.use(express.static(loc))

app.get('*', function (req, res) {
	res.sendFile(loc + '/index.html');
})

module.exports = app;
