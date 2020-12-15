// stocks.js
// ========

////main stocks array
//var stockBase = new Array();

module.exports = {


    //create new User, populate stockID, push object to stockBase array, return stockID of object
    newStock: function (stockBase) {
        let stock = new Object();
        stock.stockID = uuid();
        let len = stockBase.length;
        let push = stockBase.push(stock);
        if (len < push) {
            console.log("New stock creatd with ID: " + stock.stockID);
            return stock.stockID;
        }
        else { return -1; }
    },

    //get stock takes stockID, loops through stockBase array, find element with stockID, returns that stockObject
    getStockbyID: function (stockID, stockBase) {
        let len = stockBase.length;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].stockID === stockID) {
                return count;
            }
        }
        return -1;
    },

    //get stock takes stock TICKER
    getStockbySym: function (symbol, stockBase) {
        let len = stockBase.length;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].symbol == symbol) {
                return count;
            }
        }
        return -1;
    },

    //get stock takes stock minprice
    getStocksbyMinPrice: function (minprice, stockBase, arr) {
        var status = -1;
        var temp;
        let len = stockBase.length;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].current >= minprice) {
                temp = JSON.parse(JSON.stringify(stockBase[count]));
                arr.push(temp);
                status = 0;
            }
        }
        return status;
    },

    //get stock takes stock maxprice
    getStocksbyMaxPrice: function (maxprice, stockBase, arr) {
        var status = -1;
        var temp;
        let len = stockBase.length;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].current <= maxprice) {
                temp = JSON.parse(JSON.stringify(stockBase[count]));
                arr.push(temp);              
                status = 0;
            }
        }
        return status;
    },

    //finds stock in stockBase array thru stockID, then replace contents with supplied stockObject properties 
    editStock: function (stockObject, stockBase) {
        let len = stockBase.length;
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].stockID === stockObject.stockID) {
                stockBase[count] = JSON.parse(JSON.stringify(stockObject));
                status = 0;
                console.log("Stock Updated!");
            }
        }
        return status;
    },

    //deletes stock
    deleteStock: function (stockID, stockBase) {

        let len = stockBase.length
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (stockBase[count].stockID === stockID) {
                stockBase[count] = {};
                status = 0;
                console.log("Stock Deleted!");
            }
        }
        return status;
    },

    test: function () {
        console.log("TEST SUCCESSFULL")
    }

};


console.log("stocks.js loaded!");




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


//individual stock Object
//var User = new Object();
