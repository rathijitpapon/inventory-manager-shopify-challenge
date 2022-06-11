const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        inventoryId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        warehouse: {
            type: Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

inventorySchema.plugin(uniqueValidator);

inventorySchema.pre('save', function(next) {
    next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;