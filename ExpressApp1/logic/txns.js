// txns.js
// ========

////main txns array
//var txnBase = new Array();

module.exports = {


    //create new txn, populate txnID, push object to txnBase array, return txnID of object
    newTxn: function (txnBase) {
        let txn = new Object();
        txn.txnID = uuid();
        let len = txnBase.length;
        let push = txnBase.push(txn);
        if (len < push) {
            console.log("New txn creatd with ID: " + txn.txnID);
            return txn.txnID;
        }
        else { return -1; }
    },

    //get txn takes txnID, loops through txnBase array, find element with txnID, returns that txnObject's index
    getTxn: function (txnID, txnBase) {
        let status = -1;
        let len = txnBase.length;
        for (let count = 0; count < len; count++) {
            if (txnBase[count].txnID === this.txnID) {
                status = 0;
                return count;
            }
        }
        return status;
    },

    //finds txn in txnBase array thru txnID, then replace contents with supplied txnObject properties 
    editTxn: function (txnObject, txnBase) {
        let len = txnBase.length;
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (txnBase[count].txnID === this.txnObject.txnID) {
                txnBase[count] = JSON.parse(JSON.stringify(this.txnObject));
                status = 0;
                console.log("Transaction Updated!");
            }
        }
        return status;
    },

    //deletes txn
    deleteTxn: function (txnID, txnBase) {

        let len = txnBase.length
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (txnBase[count].txnID === this.txnID) {
                txnBase[count] = {};
                status = 0;
                console.log("Transaction Deleted!");
            }
        }
        return status;
    },

    test: function () {
        console.log("TEST SUCCESSFULL")
    }

};


console.log("txns.js loaded!");




function uuid() {
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log("New unique ID created: " + id);
    return id;
};

//uncomment to execute uuid()
//uuid();


//individual txn Object
//var txn = new Object();
