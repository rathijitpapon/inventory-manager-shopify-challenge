const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

warehouseSchema.plugin(uniqueValidator);

warehouseSchema.pre('save', function(next) {
    next();
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;