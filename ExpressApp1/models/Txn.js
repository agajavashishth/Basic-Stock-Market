const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TxnSchema = new Schema({
    ID: {
        type: String,
        default: uuid()
    },
    symbol: {
        type: String,
        required: true
    },
    volume: {
        type: Double,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Double,
        required: true
    },
    type: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});
module.exports = Txn = mongoose.model("transaction", TxnSchema);


function uuid() {
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log("New unique ID created: " + id);
    return id;
};
