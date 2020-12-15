// Users.js
// ========

////main users array
//var userBase = new Array();

module.exports = {    


    //create new User, populate userID, push object to userBase array, return userID of object
    newUser: function (userBase) {
        let user = new Object();   
        user.userID = uuid();
        let len = userBase.length;
        let push = userBase.push(user);
        if (len < push) {
            console.log("New user created with ID: " + user.userID);
            return user.userID;
        }
        else { return -1;}
    },

    //get user takes userID, loops through userBase array, find element with userID, returns that index pos in array, returns -1 if not found
    getUser: function (userID, userBase) {
       
        let len = userBase.length;
        for (let count = 0; count < len; count++) {
            if (userBase[count].userID === userID) {
                 return count;
            }
        }
        return -1;
    },

    //edit user, finds user in userBase array thru userID, then replace contents with supplied userObject properties 
    editUser: function (userObject, userBase) {
        let len = userBase.length;
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (userBase[count].userID === userObject.userID) {
                console.log("found");
                userBase[count] = JSON.parse(JSON.stringify(userObject));
                status = 0;
                console.log("User Updated!");
            }
        }
        return status;
    },

    //
    deleteUser: function (userID, userBase) {
            
        let len = userBase.length 
        let status = -1;
        for (var count = 0; count < len; count++) {
            if (userBase[count].userID === userID) {
                userBase[count] = {};
                console.log("User Deleted!");
                status = 0;
            }
        }
        return status;
    },

    addSub: function (subID, userIndex, userBase) {
        if (userBase[userIndex].subscriptions !== undefined) {
            userBase[userIndex].subscriptions.push(JSON.parse(JSON.stringify(subID)));
            console.log("Subscription with ID " + JSON.parse(subID) + " added to UserID " + JSON.parse(userBase[userIndex].userID));
        }
        else {
            userBase[userIndex].subscriptions = [];
            userBase[userIndex].subscriptions.push(JSON.parse(JSON.stringify(subID)));
            console.log("Subscription with ID " + JSON.parse(subID) + " added to UserID " + JSON.parse(userBase[userIndex].userID));
        }
        return 0;
    },

    addTxn: function (txnID, userIndex, userBase) {
        if (userBase[userIndex].transactions !== undefined) {
            userBase[userIndex].transactions.push(JSON.parse(JSON.stringify(txnID)));
            console.log("Transaction with ID " + JSON.parse(txnID) + " added to UserID " + JSON.parse(userBase[userIndex].userID));
           
        }
        else {
            userBase[userIndex].transactions = [];
            userBase[userIndex].transactions.push(JSON.parse(JSON.stringify(txnID)));
            console.log("Transaction with ID " + JSON.parse(txnID) + " added to UserID " + JSON.parse(userBase[userIndex].userID));
        }
        return 0;
    },

    deleteSub: function (subID, userIndex, userBase) {
        var len = userBase[userIndex].subscriptions.length;
        for (var i = 0; i < len; i++) {
            if (userBase[userIndex].subscriptions[i] == subID) {
                userBase[userIndex].subscriptions[i] = {};
                console.log("Subscription with ID " + JSON.parse(subID) + " deleted from UserID " + JSON.parse(userBase[userIndex].userID));
                return 0;
            }
        }
        return 0;
    },

        deleteTxn: function (txnID, userIndex, userBase) {
        var len = userBase[userIndex].transactionss.length;
        for (var i = 0; i < len; i++) {
            if (userBase[userIndex].transactions[i] == subID) {
                userBase[userIndex].transactions[i] = {};
                console.log("Transaction with ID " + JSON.parse(txnID) + " deleted from UserID " + JSON.parse(userBase[userIndex].userID));
                return 0;
            }
        }
        return 0;
    },


    test: function () {
        console.log("TEST SUCCESSFULL")
    }
  
};


console.log("users.js loaded!");




function uuid () {
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log("New unique ID created: " + id);
    return id;
};

//uncomment to execute uuid()
//uuid();


//individual user Object
//var User = new Object();
